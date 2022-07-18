import { DateTime } from "luxon";
import { h, Component } from "preact";
import "./Timer.scss";

export interface TimerProps {
  since : DateTime
}

export interface TimerState {
  minutes: number,
  seconds: number,
  milliseconds: number
}

export class Timer extends Component<TimerProps, TimerState> {

  private timer : NodeJS.Timer;

  constructor() {
    super();
    this.state = {
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    }
  }

  componentDidMount(): void {
    this.timer = setInterval(() => {
      if (!this.props.since.isValid) { return; }
      let diff = DateTime.now().diff(this.props.since).shiftTo("minutes", "seconds", "milliseconds");
      this.setState({
        minutes: diff.minutes,
        seconds: diff.seconds,
        milliseconds: diff.milliseconds
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
        <div class="value">
          { this.state.minutes.toString().padStart(2, '0') }
          <span class="marker">:</span>
          { this.state.seconds.toString().padStart(2, '0') }
          <span class="marker">.</span>
          { this.state.milliseconds.toString().padEnd(3, '0') }
        </div>
      </div>
    )
  }
}