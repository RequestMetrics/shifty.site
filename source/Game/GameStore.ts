import { getRandomInteger } from "../util/getRandomInteger";

const NUMBER_OF_WIDGETS = 10;
const MIN_TICK = 200;
const MAX_TICK = 1_000;

export interface GameState {
  widgets: WidgetState[]
}

export interface WidgetState {
  index : number
  isLoading : boolean
  isObjective :  boolean
  width : number
  height : number
  content : any
}

export class GameStore {

  private getState: () => GameState;
  private setState: any;

  private isObjectiveVisible: boolean = false;

  constructor(getState: any, setState: any) {

    this.getState = getState;
    this.setState = setState;

    var initialState = {
      widgets: []
    };

    for(var i = 0; i < NUMBER_OF_WIDGETS; i++) {
      initialState.widgets.push({
        index: i,
        isLoading: true,
        width: 10,
        height: 140,
        content: this.getItemContent()
      });
    }

    this.setState({ ...initialState });
  }


  tick() {
    var state = this.getState();

    var widget = state.widgets[getRandomInteger(0, state.widgets.length)];
    widget.isLoading = true;
    widget.width = 10;
    widget.height = 140;

    if (widget.isObjective) {
      widget.isObjective = false;
      this.isObjectiveVisible = false;
    }

    setTimeout(() => {
      widget.isLoading = false;

      if (!this.isObjectiveVisible && widget.index >= 3) {
        this.isObjectiveVisible = true;
        widget.isObjective = true;
        widget.width = 10;
        widget.height = 50;
        widget.content = "TODO";
      }
      else {
        widget.width = this.getItemWidth();
        widget.height = this.getItemHeight();
      }

      this.setState(state);
    }, this.getLoadingInterval());

    this.setState(state);
    this.setupNextTick();
  }

  private setupNextTick() {
    setTimeout(() => this.tick(), this.getTickInterval())
  }

  private getTickInterval() : number {
    return getRandomInteger(300, 800)
  }

  private getLoadingInterval() : number {
    return getRandomInteger(100, 2_000);
  }

  getItemWidth() : number {
    const WIDTHS = [25,25,25,25,25,33,33,33,33,33,50,50,100];
    return WIDTHS[getRandomInteger(0, WIDTHS.length)];
  }

  getItemHeight() : number {
    const HEIGHTS = [50,100,200];
    return HEIGHTS[getRandomInteger(0, HEIGHTS.length)];
  }

  getItemContent() : any {

  }
}