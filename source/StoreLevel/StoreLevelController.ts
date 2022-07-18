import { GameController } from "../GameController";
import { GameTimer } from "../GameTimer";
import { getRandomInteger } from "../util/getRandomInteger";

const WIDGET_COUNT = 10;
const CLICKS_TO_WIN = 3;

export interface StoreLevelState {
  clicks : number
  isObjectiveVisible : boolean
  showFailModal : boolean
  failModalAdjustX : number
  failModalAdjustY : number
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

    GameTimer.onTick(() => this.onTick());

    let initialState = {
      clicks: 0,
      isObjectiveVisible: false,
      showFailModal: false,
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

    let unloadedWidgets = state.widgets.filter((w) => w.status === WidgetStatus.EMPTY);
    if (unloadedWidgets.length) {
      this.setLoading(unloadedWidgets[0]);
      this.updateWidgetState(unloadedWidgets[0]);
      return;
    }

    let changeableWidgets = state.widgets.filter((w) => w.status !== WidgetStatus.LOADING);
    if (!changeableWidgets.length) { return; }

    let widget = changeableWidgets[getRandomInteger(0, changeableWidgets.length)];

    if (widget.status === WidgetStatus.OBJECTIVE) {
      this.setState({ isObjectiveVisible: false });
    }

    this.setLoading(widget);
    this.updateWidgetState(widget);
  }

  private setLoading(widget: WidgetState) {
    widget.status = WidgetStatus.LOADING;
    setTimeout(() => {
      let state = this.getState();
      if (!state.isObjectiveVisible && widget.index >= 3) {
        this.setState({ isObjectiveVisible: true });
        widget.status = WidgetStatus.OBJECTIVE;
      }
      else {
        widget.status = WidgetStatus.CONTENT;
      }
      this.updateWidgetState(widget);
    }, getRandomInteger(600, 3200))
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
      }

      GameTimer.multiplier = clicks;
      this.setState({ clicks });
    }
    else {
      this.reset();
      this.setState({
        showFailModal: true,
        failModalAdjustX: getRandomInteger(-40,40),
        failModalAdjustY: getRandomInteger(-40,40)
      });
    }
  }

  clearFail() {
    this.setState({ showFailModal: false });
  }

  doubleFail() {
    this.setState({
      showFailModal: true,
      failModalAdjustX: getRandomInteger(-40,40),
      failModalAdjustY: getRandomInteger(-40,40)
    });
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