import { h, Component } from "preact";
import { GameTimer } from "../GameTimer";
import { getRandomInteger } from "../util/getRandomInteger";
import { isSafari } from "../util/isSafari";
import "./ShiftCounter.scss";

interface ShiftCounterState {
  cls: number
}

export class ShiftCounter extends Component<any, ShiftCounterState> {

  private observer : PerformanceObserver;

  constructor() {
    super();
    this.state = {
      cls: 0
    };
  }

  componentDidMount(): void {
    if (isSafari()) {
      GameTimer.onTick((tick) => {
        let cls = this.state.cls;
        cls = cls + ((getRandomInteger(100, 200) + (tick*10)) / 1_000);
        this.setState({ cls });
      })
    }
    else {
      this.observer = new PerformanceObserver(entryList => {
        let entries = entryList.getEntries() || [];
        let cls = entries.reduce((cls, entry: any, index) => {
          return cls + entry.value;
        }, this.state.cls);
        this.setState({ cls });
      });
      this.observer.observe({ type: "layout-shift", buffered: false });
    }
  }

  componentWillUnmount(): void {
    this.observer.disconnect();
  }

  render() : h.JSX.Element {
    return (
      <div class="shift-counter">
        <div class="label">CLS</div>
        <div class="value">
          { this.state.cls.toFixed(4) }
        </div>
      </div>
    )
  }
}