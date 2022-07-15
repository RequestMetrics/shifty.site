import { GameTimer } from "../GameTimer";
import { getRandomInteger } from "../util/getRandomInteger";

const WIDGET_COUNT = 8;
const CLICKS_TO_WIN = 3;

export interface StoreLevelState {
  clicks : number
  isObjectiveVisible : boolean
  widgets : WidgetState[]
}

export interface WidgetState {
  index : number
  status : WidgetStatus
}

export enum WidgetStatus {
  EMPTY,
  LOADING,
  CONTENT,
  OBJECTIVE,
  COMPLETE
}

class _StoreLevelController {

  getState: () => StoreLevelState;
  setState: (state: any) => void;

  init(getState: () => StoreLevelState, setState: (state: any) => void) {

    this.getState = getState;
    this.setState = setState;

    GameTimer.onTick(() => this.onTick())

    let initialState = {
      clicks: 0,
      isObjectiveVisible: false,
      widgets: []
    };

    for(var i = 0; i < WIDGET_COUNT; i++) {
      let widget = {
        index: i,
        status: WidgetStatus.EMPTY
      };
      initialState.widgets.push(widget);
    }

    this.setState({ ...initialState });
  }

  onTick() {
    let state = this.getState();
    let widget = state.widgets[getRandomInteger(0, state.widgets.length)];

    if (widget.status === WidgetStatus.EMPTY) {
      widget.status = WidgetStatus.LOADING;
    }
    else if (widget.status === WidgetStatus.LOADING) {
      if (!state.isObjectiveVisible && widget.index >= 3) {
        this.setState({ isObjectiveVisible: true });
        widget.status = WidgetStatus.OBJECTIVE;
      }
      else {
        widget.status = WidgetStatus.CONTENT;
      }
    }
    else if (widget.status === WidgetStatus.OBJECTIVE) {
      widget.status = WidgetStatus.LOADING;
      this.setState({ isObjectiveVisible: false });
    }
    else if (widget.status === WidgetStatus.CONTENT) {
      widget.status = WidgetStatus.LOADING;
    }
    else {
      // ... do nothing
    }

    this.updateWidgetState(widget);
  }

  click(index: number, event: Event) {
    event.stopPropagation();

    let state = this.getState();
    let widget = state.widgets[index];

    if (widget && widget.status === WidgetStatus.OBJECTIVE) {
      widget.status = WidgetStatus.COMPLETE;
      this.updateWidgetState(widget);

      let clicks = state.clicks + 1;
      if (clicks >= CLICKS_TO_WIN) {
        alert('YOU WON!');
      }
      else {
        this.setState({ isObjectiveVisible: false });
        alert('ANOTHER ONE!');
      }

      GameTimer.multiplier = clicks;
      this.setState({ clicks });
    }
    else {
      this.reset();
      alert('boo');
    }
  }

  private reset() {
    let state = this.getState()
    this.setState({
      clicks: 0,
      widgets: state.widgets.map((w) => {
        if (w.status === WidgetStatus.COMPLETE) {
          w.status = WidgetStatus.LOADING;
        }
        return w;
      })
    });
    GameTimer.multiplier = 0;
  }

  private updateWidgetState(widget : WidgetState) {
    let state = this.getState();
    this.setState({
      widgets: state.widgets.map((w) => {
        if (w.index === widget.index) {
          return { ...widget };
        }
        return w;
      })
    });
  }

}

export const StoreLevelController = new _StoreLevelController();