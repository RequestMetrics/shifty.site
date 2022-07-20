import { h, Component } from "preact";
import { GameController, GameState, level } from "./GameController";
import { StoreLevel } from "./StoreLevel/StoreLevel";
import { Timer } from "./Timer/Timer";
import "./Game.scss";
import { GameTimer } from "./GameTimer";
import { ShiftCounter } from "./ShiftCounter/ShiftCounter";
import { Launcher } from "./Launcher/Launcher";


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
            <h1>Shifty.site</h1>
            <div class="controls">
              <Timer until={ this.state.endTime } />
              <ShiftCounter />
              {/* <button onClick={() => GameTimer.pause() }>Pause</button> */}
            </div>
          </div>
        </header>
        <div class="level-wrap">
          { this.renderLevel() }
        </div>
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
