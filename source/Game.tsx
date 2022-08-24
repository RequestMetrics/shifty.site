import { h, Component } from "preact";
import { GameController, GameState, level } from "./GameController";
import { StoreLevel } from "./StoreLevel/StoreLevel";
import { Timer } from "./Timer/Timer";
import "./Game.scss";
import { GameTimer } from "./GameTimer";
import { ShiftCounter } from "./ShiftCounter/ShiftCounter";
import { Launcher } from "./Launcher/Launcher";
import { CountdownModal } from "./CountdownModal";
import { FinishModal } from "./FinishModal";
import { sound, SoundController } from "./SoundController";


export class Game extends Component<any, GameState> {

  constructor() {
    super();

    GameController.init(() => this.state, this.setState.bind(this));
  }

  render(): h.JSX.Element {
    return(
      <div class="game">
        <header>
          <div class="header-box">
            <div class="controls">
              <Timer until={ this.state.endTime } />
              <ShiftCounter />
              {/* <button onClick={() => SoundController.play(sound.cart_add) }>Sound</button> */}
              <button onClick={() => GameTimer.pause() }>Pause</button>
            </div>
          </div>
        </header>
        <div class="level-wrap">
          { this.renderLevel() }
        </div>

        <CountdownModal isOpen={!!this.state.countdown} number={this.state.countdown} />
        <FinishModal isOpen={this.state.showFinishModal} cart={this.state.cart} clicks={this.state.clicks} cls={GameController.cls} />
      </div>
    );
  }

  renderLevel() : h.JSX.Element {
    if (this.state.level === level.NO_LEVEL) {
      return (<Launcher />)
    }
    else if (this.state.level === level.STORE) {
      return (<StoreLevel />);
    }
  }

}
