import { h, Component } from "preact";
import { EcommerceLevel } from "../LevelEcommerce/LevelEcommerce";
import { Timer } from "../Timer/Timer";
import "./Game.scss";
import { GameState, GameStore, level } from "../GameStore";

export class Game extends Component<any, GameState> {

  constructor() {
    super();

    GameStore.init(() => this.state, this.setState.bind(this));
  }

  refreshItems() {
    console.log('refresh', this.state);
  }

  render() {
    return(
      <div class="game-wrap">
        <header>
          <h1>My Cool Game</h1>
          <Timer since={ this.state.startedOn } />
        </header>
        <div class="level-wrap">
          { this.renderLevel() }
        </div>
      </div>
    );
  }

  renderLevel() : h.JSX.Element {
    if (this.state.level === level.NO_LEVEL) {
      return (
        <div>
          <button type="button" onClick={e => GameStore.start()}>Start!</button>
        </div>
      )
    }
    else if (this.state.level === level.ECOMMERCE) {
      return (<EcommerceLevel />);
    }
  }

}
