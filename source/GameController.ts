import { GameTimer } from "./GameTimer";

export enum level {
  NO_LEVEL,
  STORE
}

export interface GameState {
  level: level
}

class _GameController {

  getState: () => GameState;
  setState: (state: GameState) => void;

  init(getState: () => GameState, setState: (state: GameState) => void) {

    this.getState = getState;
    this.setState = setState;

    var initialState = {
      level: level.NO_LEVEL,
      widgets: []
    };

    this.setState({ ...initialState });
  }

  start(level: level) {
    GameTimer.start();
    this.setState({
      level: level
    });
  }

}

export const GameController = new _GameController();