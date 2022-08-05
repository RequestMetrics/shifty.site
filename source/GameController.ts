import { DateTime } from "luxon";
import { PLAYER_STORAGE_KEY } from "./Constants";
import { GameTimer } from "./GameTimer";
import { StoreLevelController } from "./StoreLevel/StoreLevelController";
import { getLocalStorage, setLocalStorage } from "./util/xetLocalStorage";

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
  cart: number,
  clicks: number,
  name: string,
  email: string,
  timestamp: DateTime
}

class _GameController {

  getState: () => GameState;
  setState: (state: any) => void;
  cls: number = 0;

  init(getState: () => GameState, setState: (state: any) => void) {

    this.getState = getState;
    this.setState = setState;

    this.setState({
      cart: 0,
      clicks: 0,
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
        this.stop();
      }
    })
    GameTimer.start();
  }

  stop() {
    GameTimer.stop();

    let cart = StoreLevelController.getState().cart;
    let clicks = StoreLevelController.getState().clicks;

    this.setState({
      startTime: DateTime.invalid("initial"),
      endTime: DateTime.invalid("initial"),
      showFinishModal: true,
      cart,
      clicks
    });

    let state = this.getState();

    let savedPlayerData = getLocalStorage(PLAYER_STORAGE_KEY) || [];
    savedPlayerData.push({
      name: state.name,
      email: state.email,
      cart: cart,
      clicks: clicks,
      timestamp: state.timestamp
    });
    setLocalStorage(PLAYER_STORAGE_KEY, savedPlayerData);
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