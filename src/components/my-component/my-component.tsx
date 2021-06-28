import { Element, Component, Prop, h, Watch } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Element() el: HTMLElement;

  hasHistWatcherCalls = 0;

  private isInitialized = false;

  componentWillLoad() {
    console.log('componentWillLoad', this.el.getAttribute('id'));
    if (!this.isInitialized) {
      this.hasHistogramWatcher(this.hasHistogram, undefined);
    }
  }

  @Prop({ reflect: true }) hasHistogram: boolean;
  @Watch('hasHistogram')
  hasHistogramWatcher(newValue?: boolean, oldValue?: boolean) {
    // this.isInitialized = true;
    console.log('hasHistogramWatcher', this.el.getAttribute('id'), newValue, oldValue);
    if (newValue !== oldValue) {
      this.hasHistWatcherCalls++;
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.el.getAttribute('id')}: {this.hasHistogram?.toString()}
        </div>
        <div>Has Histogram Watcher Calls: {this.hasHistWatcherCalls}</div>
      </div>
    );
  }
}
