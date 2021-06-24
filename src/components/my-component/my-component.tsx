import { Element, Component, Prop, h, Watch } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Element() el: HTMLElement;

  histWatcherCalls = 0;
  hasHistWatcherCalls = 0;

  componentWillLoad() {
    // Uncomment these to fire the watchers on initialization...
    // this.histogramWatcher(this.histogram, undefined);
    // this.hasHistogramWatcher(this.hasHistogram, undefined);
  }

  @Prop() histogram: Array<Array<number>>;
  @Watch('histogram')
  histogramWatcher(newValue?: Array<Array<number>>, oldValue?: Array<Array<number>>) {
    if (newValue !== oldValue) {
      this.histWatcherCalls++;
    }
  }

  @Prop({ reflect: true }) hasHistogram: boolean;
  @Watch('hasHistogram')
  hasHistogramWatcher(newValue?: boolean, oldValue?: boolean) {
    if (newValue !== oldValue) {
      this.hasHistWatcherCalls++;
    }
  }

  render() {
    return (
      <div>
        <div>{this.el.getAttribute('id')}</div>
        <div>Histogram Watcher Calls: {this.histWatcherCalls}</div>
        <div>Has Histogram Watcher Calls: {this.hasHistWatcherCalls}</div>
      </div>
    );
  }
}
