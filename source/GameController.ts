import { DateTime } from "luxon";
import { GameTimer } from "./GameTimer";
import { StoreLevelController } from "./StoreLevel/StoreLevelController";

const GAME_LIMIT_SECONDS = 30;
const GAME_COUNTDOWN = 5;

export enum level {
  NO_LEVEL,
  STORE
}

export interface GameState {
  countdown: number,
  level: level,
  startTime: DateTime,
  endTime: DateTime,
  showFinishModal: boolean
  score: number
}

class _GameController {

  getState: () => GameState;
  setState: (state: any) => void;
  cls: number = 0;

  init(getState: () => GameState, setState: (state: any) => void) {

    this.getState = getState;
    this.setState = setState;

    this.setState({
      level: level.NO_LEVEL,
      startTime: DateTime.invalid("initial"),
      endTime: DateTime.invalid("initial"),
      showFinishModal: false
    });
  }

  reset() {
    location.reload();
  }

  async start(level: level) {

    await this.countdown(GAME_COUNTDOWN);

    let now = DateTime.now();
    this.setState({
      level: level,
      startTime: now,
      endTime: now.plus({ seconds: GAME_LIMIT_SECONDS })
    });
    GameTimer.onTick(() => {
      let state = this.getState();
      if (DateTime.now() > state.endTime) {
        this.stop(StoreLevelController.getState().clicks);
      }
    })
    GameTimer.start();
  }

  stop(score: number) {
    GameTimer.stop();
    this.setState({
      startTime: DateTime.invalid("initial"),
      endTime: DateTime.invalid("initial"),
      showFinishModal: true,
      score
    });
  }

  private countdown(i : number) : Promise<void> {
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