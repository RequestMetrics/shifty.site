import { DateTime } from "luxon";
import { GameTimer } from "./GameTimer";

const GAME_LIMIT_SECONDS = 30;

export enum level {
  NO_LEVEL,
  STORE
}

export interface GameState {
  countdown: number,
  level: level,
  startTime: DateTime,
  endTime: DateTime
}

class _GameController {

  getState: () => GameState;
  setState: (state: any) => void;

  init(getState: () => GameState, setState: (state: any) => void) {

    this.getState = getState;
    this.setState = setState;

    var initialState = {
      level: level.NO_LEVEL,
      startTime: DateTime.invalid("initial"),
      endTime: DateTime.invalid("initial"),
    };

    this.setState({ ...initialState });
  }

  async start(level: level) {

    await this.countdown(5);

    let now = DateTime.now();
    this.setState({
      level: level,
      startTime: now,
      endTime: now.plus({ seconds: GAME_LIMIT_SECONDS })
    });
    GameTimer.onTick(() => {
      let state = this.getState();
      if (DateTime.now() > state.endTime) {
        GameTimer.stop();
        console.log('OVER');
      }
    })
    GameTimer.start();
  }

  countdown(i : number) : Promise<void> {
    return new Promise((res, rej) => {
      this.setState({countdown: i});
      if (i <= 0) {
        res();
      }
      else {
        setTimeout(() => {
          this.countdown(i - 1).then(res);
        }, 1_000);
      }
    });
  }

}



export const GameController = new _GameController();