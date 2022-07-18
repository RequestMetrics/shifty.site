import { DateTime } from "luxon";
import { h, Component } from "preact";
import "./Timer.scss";

export interface TimerProps {
  until : DateTime
}

export interface TimerState {
  seconds: number,
  milliseconds: number
}

export class Timer extends Component<TimerProps, TimerState> {

  private timer : NodeJS.Timer;

  constructor() {
    super();
    this.state = {
      seconds: 0,
      milliseconds: 0
    }
  }

  componentDidMount(): void {
    this.timer = setInterval(() => {
      if (!this.props.until.isValid) { return; }
      let diff = this.props.until.diff(DateTime.now()).shiftTo("seconds", "milliseconds");
      this.setState({
        seconds: Math.max(diff.seconds, 0),
        milliseconds: Math.max(diff.milliseconds, 0)
      });
    }, 100);
  }

  componentWillUnmount(): void {
    clearInterval(this.timer);
  }

  render() : h.JSX.Element {
    return (
      <div class="timer">
        <div class="label">Time</div>
        <div class={`value ${this.state.seconds <= 5 && this.state.milliseconds+this.state.seconds !== 0 ? "danger" : "" }`}>
          { this.state.seconds.toString().padStart(2, '0') }
          <span class="marker">.</span>
          { this.state.milliseconds.toString().padEnd(3, '0') }
        </div>
      </div>
    )
  }
}