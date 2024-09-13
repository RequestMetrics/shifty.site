import { DateTime } from "luxon";
import { PLAYER_STORAGE_KEY } from "../constants";
import { GameTimer } from "./GameTimer";
import { SoundController } from "./SoundController";
import { StoreLevelController } from "../StoreLevel/StoreLevelController";
import { getLocalStorage, setLocalStorage } from "../lib";

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

    getState!: () => GameState;
    setState!: (state: any) => void;
    cls: number = 0;
    countdownWarning: boolean = false;
    onStartCbs: (() => void)[] = [];

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

        SoundController.play("countdown");
        await this.countdown(GAME_COUNTDOWN);

        let now = DateTime.now();
        this.setState({
            level: level,
            startTime: now,
            endTime: now.plus({ seconds: GAME_LIMIT_SECONDS })
        });
        GameTimer.onTick(() => {
            let state = this.getState();

            let diff = state.endTime.diff(DateTime.now()).shiftTo("seconds");
            if (diff.seconds <= 5 && !this.countdownWarning) {
                this.countdownWarning = true;
                SoundController.play("countdown");
            }

            if (DateTime.now() > state.endTime) {
                this.stop();
            }
        })
        GameTimer.start();
        this.onStartCbs.forEach(cb => cb());
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

        if (cart > 0) {
            SoundController.play("game_win");
        }
        else {
            SoundController.play("game_lose");
        }

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

    onStart(cb: () => void): void {
        this.onStartCbs.push(cb);
    }

    private countdown(i: number): Promise<void> {
        return new Promise((res) => {
            this.setState({ countdown: i });
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