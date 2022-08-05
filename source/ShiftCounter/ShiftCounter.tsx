import { h, Component } from "preact";
import { GameController } from "../GameController";
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
        cls = cls + ((getRandomInteger(5000, 10000) + (tick)) / 10000);
        this.setState({ cls });
        GameController.cls = cls;
      })
    }
    else {
      this.observer = new PerformanceObserver(entryList => {
        let entries = entryList.getEntries() || [];
        let cls = entries.reduce((cls, entry: any, index) => {
          return cls + entry.value;
        }, this.state.cls);
        this.setState({ cls });
        GameController.cls = cls;
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