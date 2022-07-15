import { DateTime } from "luxon";
import { h, Component } from "preact";

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
        { this.state.minutes } : { this.state.seconds } . { this.state.milliseconds }
      </div>
    )
  }
}