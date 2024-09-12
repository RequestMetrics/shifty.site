import { Component, render } from "preact";
import { GameController, GameState, level } from "@/controllers/GameController";
import { GameTimer } from "@/controllers/GameTimer";
import { StoreLevel } from "@/StoreLevel/StoreLevel";
import { Timer } from "@/components/Timer";
import { ShiftCounter } from "@/components/ShiftCounter";
import { CountdownModal } from "@/components/CountdownModal";
import { FinishModal } from "@/components/FinishModal";

import "./main.css";
import "./Game.scss";

class Game extends Component<any, GameState> {

    constructor() {
        super();

        GameController.init(() => this.state, this.setState.bind(this));
        // GameController.start(level.STORE);
    }

    render() {
        return (
            <>
                <header class="game-header flex align-center">
                    <h1 class="game-logo">
                        <a href="/">Shifty.site</a>
                    </h1>
                    <div class="game-stats">
                        <Timer until={this.state.endTime} />
                        <ShiftCounter />
                    </div>
                    <div class="game-controls flex">
                        <button type="button" class="btn" onClick={() => GameTimer.pause()}>Pause</button>
                        <button type="button" class="btn" onClick={() => GameTimer.pause()}>Exit</button>
                    </div>
                </header>
                {this.renderGameContent()}
                {/* <CountdownModal isOpen={!!this.state.countdown} number={this.state.countdown} /> */}
                <FinishModal isOpen={this.state.showFinishModal} cart={this.state.cart} clicks={this.state.clicks} cls={GameController.cls} />
            </>
        );
    }

    renderGameContent() {
        if (!!this.state.countdown) {
            return (
                <div class="game-countdown-wrap flex align-center justify-center">
                    <div class="loading"><i class="spinner"></i></div>
                    <div class="countdown-value">{this.state.countdown}</div>
                </div>
            )
        }
        else if (this.state.level === level.NO_LEVEL) {
            return (
                <div class="game-info-wrap">
                    <div class="game-info flex-column align-center justify-center">
                        <header>
                            <h2>How to play</h2>
                        </header>
                        <div class="how-content flex-column">
                            <picture class="how-illustration">
                                <img src="/images/explainer-landscape.png" loading="lazy" width="600" height="300" alt="Click the Deal of the Day" />
                            </picture>
                            <div class="how-text">
                                <p>
                                    You are about to load the GreatGets online store. The site
                                    loads products slowly, causing the layout to shift around,
                                    violently.
                                </p>
                                <p>
                                    Dodge the shifting products and add as many <strong>"Deal of the Day"</strong> products
                                    into your cart before the time runs out.
                                </p>
                            </div>

                        </div>
                        <footer class="flex-column justify-center">
                            <button type="button" class="btn btn-big btn-primary" onClick={() => GameController.start(level.STORE)} >Start Game</button>
                        </footer>
                    </div>
                </div>
            )
        }
        else if (this.state.level === level.STORE) {
            return (
                <div class="level-wrap">
                    <StoreLevel />
                </div >
            )
        }
    }

}

render(<Game />, document.getElementById('game')!)