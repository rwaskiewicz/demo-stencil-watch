import { Component, Prop, h, Watch } from '@stencil/core';

@Component({
  tag: 'my-component',
})
export class MyComponent {

  hasHistWatcherCalls = 0;

  @Prop({ reflect: true }) hasHistogram: boolean;
  @Watch('hasHistogram')
  hasHistogramWatcher(newValue?: boolean, oldValue?: boolean) {
    console.log(`Received new value: ${newValue} and old value: ${oldValue}`);
    this.hasHistWatcherCalls++;
  }

  render() {
    console.log('render');
    return (
      <div>
        <div>
          hasHistogram Value: {this.hasHistogram?.toString() ?? 'unset'}
        </div>
        <div>Has Histogram Watcher Calls: {this.hasHistWatcherCalls}</div>
      </div>
    );
  }
}
