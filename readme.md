# Demo Watcher

There are two ways to run this:

1. `npm start`
1. `npm build` then `http-server -c0 site` (or use some other way to spin up a quick server)

The first way loads everything async.
The second way essentially does a custom elements build and loads the elements via `defineCustomElements`

The `src/index.html` and `site/index.html` differ only in how they load the bundles. Otherwise, they set up a timeout similating a change from some outside influence. They also contain a method called `runTest()` that performs an initialization of data.

There are two ways that you can call `runTest()`:

```JavaScript
    // runTest();
    customElements.whenDefined('my-component').then(runTest);
```

Only the second way is valid, IMO, but I have both there for completeness.

There are two instances of the component:

```HTML
    <my-component id="Dude"></my-component>
    <my-component id="Stuffs" has-histogram="false"></my-component>
```

- with Dude, the `hasHistogram` property is set in the JavaScript (see `runTest()`)
- with Stuffs, the `hasHistogram` property is set declaritively via the `has-histogram` attribute

## Behavior

### Expected

For both Dude and Stuffs, the Has Histogram Watcher should be called originally once for the initialization that we are forcing vi the `componentWillLoad()` call.

Then, after 3 seconds, it should be called a second time on each.

### Async Load

Works as expected

### Sync `defineCustomElements()` Load

Stuffs works as expected.

Dude works as such:

- watcher fires on initialization due to `runTest()` setting the value
- watcher fires again on initialization due to `componentWillLoad()`

So at this point, Stuffs has called the watcher once (as expected) and Dude has called it twice (once too many)

After the timer, Dude goes to 3 calls, and Stuffs goes to 2. This makes sense given the initialization, but the initialization was wrong in calling the watcher twice for Dude.

The only way I have found around this is a bogus state flag. See isInitialized, which I have partially commented out. If the code that sets that true is uncommented, then this works fine, but that is a lot of manual state management in each of the components that someone would write.
