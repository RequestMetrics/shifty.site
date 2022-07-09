import { getRandomInteger } from "../util/getRandomInteger";

const NUMBER_OF_WIDGETS = 10;

export interface GameState {
  widgets: Array<{
    index: number,
    isLoading: boolean,
    width: number,
    content: any
  }>
}

export class GameStore {

  private getState: () => GameState;
  private setState: any;

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
        width: this.getItemWidth(),
        content: this.getItemContent()
      });
    }

    this.setState({ ...initialState });
  }

  getItemWidth() : number {
    const WIDTHS = [25,25,25,33,33,33,50,50,100];
    return WIDTHS[getRandomInteger(0, WIDTHS.length)];
  }

  getItemContent() : any {

  }
}