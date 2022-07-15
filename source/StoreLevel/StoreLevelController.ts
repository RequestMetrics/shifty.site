import { GameController } from "../GameController";
import { GameTimer } from "../GameTimer";
import { getRandomInteger } from "../util/getRandomInteger";

const WIDGET_COUNT = 10;
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
      // this.reloadWidget(widget);
      initialState.widgets.push(widget);
    }

    this.setState({ ...initialState });
    // setTimeout(() => this.tick());
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

  // click(index : number) {
  //   let widget = this.getState().widgets[index];

  //   if (widget.status === WidgetStatus.OBJECTIVE) {
  //     widget.status = WidgetStatus.COMPLETE;
  //     this.setState(this.getState);
  //     alert('yay');
  //   }
  // }

  // private reloadWidget(widget : WidgetState) {
  //   let state = this.getState();

  //   if (widget.status === WidgetStatus.OBJECTIVE) {
  //     this.setState({ isObjectiveVisible : false });
  //   }

  //   widget.status = WidgetStatus.LOADING;
  //   this.updateWidgetState(widget);

  //   setTimeout(() => {
  //     let state = this.getState();

  //     if (!state.isObjectiveVisible && widget.index >= 3) {
  //       this.setState({ isObjectiveVisible : true });
  //       widget.status = WidgetStatus.OBJECTIVE;
  //     }
  //     else {
  //       widget.status = WidgetStatus.CONTENT;
  //     }

  //     this.updateWidgetState(widget);
  //   }, getRandomInteger(100, 2_000));
  // }

  // private tick() : void {
  //   let widget = this.getChangeableWidget();
  //   if (widget === null) { this.setupNextTick(); return; }

  //   let state = this.getState();

  //   this.reloadWidget(widget);
  //   this.setState(state);
  //   this.setupNextTick();
  // }

  // private setupNextTick() {
  //   setTimeout(() => this.tick(), this.getTickInterval())
  // }

  // private getChangeableWidget() : WidgetState {
  //   let state = this.getState();
  //   let widget;

  //   if (!state.widgets.some((widget) => widget.status === WidgetStatus.CONTENT || widget.status === WidgetStatus.OBJECTIVE)) {
  //     return null;
  //   }

  //   while(!widget || !widget.isLoading || !widget.isComplete) {
  //     widget = state.widgets[getRandomInteger(0, state.widgets.length)];
  //   }

  //   return widget;
  // }

  // private getTickInterval() : number {
  //   return getRandomInteger(300, 800)
  // }

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