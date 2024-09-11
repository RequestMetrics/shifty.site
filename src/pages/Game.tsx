import { Component } from "preact";
import { GameController, GameState, level } from "../controllers/GameController";
import { GameTimer } from "../controllers/GameTimer";
import { StoreLevel } from "../StoreLevel/StoreLevel";
import { Timer } from "../components/Timer";
import { ShiftCounter } from "../components/ShiftCounter";
import { Launcher } from "../components/Launcher";
import { CountdownModal } from "../components/CountdownModal";
import { FinishModal } from "../components/FinishModal";

import "./Game.scss";

export default class Game extends Component<any, GameState> {

    constructor() {
        super();

        GameController.init(() => this.state, this.setState.bind(this));
    }

    render() {
        return (
            <div class="game">
                <header>
                    <div class="header-box">
                        <div class="controls">
                            <Timer until={this.state.endTime} />
                            <ShiftCounter />
                            {/* <button onClick={() => SoundController.play(sound.cart_add) }>Sound</button> */}
                            <button onClick={() => GameTimer.pause()}>Pause</button>
                        </div>
                    </div>
                </header>
                <div class="level-wrap">
                    {this.renderLevel()}
                </div>

                <CountdownModal isOpen={!!this.state.countdown} number={this.state.countdown} />
                <FinishModal isOpen={this.state.showFinishModal} cart={this.state.cart} clicks={this.state.clicks} cls={GameController.cls} />
            </div>
        );
    }

    renderLevel() {
        if (this.state.level === level.NO_LEVEL) {
            return (<Launcher />)
        }
        else if (this.state.level === level.STORE) {
            return (<StoreLevel />);
        }
    }

}