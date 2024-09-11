import { h, Component } from "preact";
import { GameController } from "../GameController";
import { GameTimer } from "../GameTimer";
import { getRandomInteger } from "../util/getRandomInteger";
import { isSafari } from "../util/isSafari";
import "./ShiftCounter.scss";

/**
 * The LayoutShift interface of the Performance API provides insights into the layout stability of web pages based on movements of the elements on the page.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/LayoutShift)
 */
interface CustomLayoutShift extends PerformanceEntry {
  readonly value: number;
}

interface ShiftCounterState {
  cls: number
}

export class ShiftCounter extends Component<any, ShiftCounterState> {

  private observer: PerformanceObserver;

  constructor() {
    super();
    this.state = {
      cls: 0
    };
  }

  componentDidMount(): void {

    if (isSafari()) {
      console.info("approximating layout shift value on Safari");
      GameTimer.onTick((tick) => {
        let cls = this.state.cls;
        cls = cls + ((getRandomInteger(5000, 10000) + (tick)) / 10000);
        this.setState({ cls });
        GameController.cls = cls;
      })
    }
    else {
      let cls = this.state.cls;
      this.observer = new PerformanceObserver((list: PerformanceObserverEntryList) => {
        Promise.resolve().then(() => {
          list.getEntries().forEach((entry: CustomLayoutShift) => {
            cls += entry.value
          });
          this.setState({ cls });
        })
        this.setState({ cls });
        GameController.cls = cls;
      });
      this.observer.observe({ type: "layout-shift", buffered: false });
    }
  }

  componentWillUnmount(): void {
    this.observer.disconnect();
  }

  render(): h.JSX.Element {
    return (
      <div class="shift-counter">
        <div class="label">CLS</div>
        <div class="value">
          {this.state.cls.toFixed(4)}
        </div>
      </div>
    )
  }
}