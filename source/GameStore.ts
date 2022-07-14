import { DateTime } from "luxon";
import { getRandomInteger } from "./util/getRandomInteger";


const MIN_TICK = 200;
const MAX_TICK = 1_000;

export enum level {
  NO_LEVEL,
  ECOMMERCE
}

export interface GameState {
  level: level
  startedOn?: DateTime
}



class _GameStore {

  public getState: () => GameState;
  private setState: any;


  init(getState: () => GameState, setState: (GameState) => void) {

    this.getState = getState;
    this.setState = setState;

    var initialState = {
      level: level.NO_LEVEL,
      widgets: []
    };



    this.setState({ ...initialState });
  }

  start() {
    this.setState({
      level: level.ECOMMERCE,
      startedOn: DateTime.now()
    });
    // this.tick();
  }


  getItemContent() : any {

  }
}

export const GameStore = new _GameStore();