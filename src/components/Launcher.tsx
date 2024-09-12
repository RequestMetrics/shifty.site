import { Component } from "preact";
import { GameInfoModal } from "./GameInfoModal";
import { GameController, level } from "@/controllers/GameController";

import "./Launcher.css";

interface GameLauncherState {
    isGameInfoModalOpen: boolean
}

export class Launcher extends Component<any, GameLauncherState> {

    constructor() {
        super();
        this.state = {
            isGameInfoModalOpen: true
        };
    }

    render(_props: any, state: GameLauncherState) {
        return (
            <>
                <div class="store-level">
                    <header class="store-header">
                        <div class="logo">
                            <img src="/images/logo.png" width="136" height="80" />
                        </div>
                        <div class="cart">
                            <span class="cart-count">0</span>
                            <img src="/images/cart.svg"></img>
                            <span class="cart-label">Cart</span>
                        </div>
                    </header>
                    <div class="widget-grid"></div>
                </div>
                <GameInfoModal isOpen={state.isGameInfoModalOpen} onClose={this.startGame.bind(this)} closeButtonText="Start Game" />
            </>
        )
    }

    startGame() {
        this.setState({ isGameInfoModalOpen: false });
        GameController.start(level.STORE);
    }
}