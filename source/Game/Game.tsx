import { h, Component, ComponentChild } from "preact";
import "./Game.scss";
import { GameState, GameStore } from "./GameStore";
import { Widget } from "./Widget";

export class Game extends Component<any, GameState> {

  private gameStore : GameStore

  constructor() {
    super();

    this.state = {
      widgets: []
    }
    this.gameStore = new GameStore(() => this.state, this.setState.bind(this));
    setTimeout(() => this.gameStore.tick(), 1_000);
  }

  refreshItems() {
    console.log('refresh', this.state);
  }

  render() {
    return(
      <div class="game-wrap">
        <h2>They Game</h2>
        <div class="product-grid">
          {this.state.widgets.map(widgetState => <Widget {...widgetState} />)}
        </div>
      </div>
    );
  }
}
