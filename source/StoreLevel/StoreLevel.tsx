import { h, Component } from "preact";
import { StoreLevelController, StoreLevelState } from "./StoreLevelController";
import { Widget } from "./Widget";
import "./StoreLevel.scss";
import { FailModal } from "./FailModal";
import { getRandomInteger } from "../util/getRandomInteger";


export class StoreLevel extends Component<any, StoreLevelState> {

  constructor() {
    super();
    StoreLevelController.init(() => this.state, this.setState.bind(this));
  }

  render() {
    return(
      <div class="store-level">
        <header class="store-header">
          <div class="logo">
            <img src="/assets/images/logo.png" width="136" height="80" />
          </div>
          <div class="cart">
            <span class="cart-count">{ this.state.clicks }</span>
            <img src="/assets/images/cart.svg"></img>
            <span class="cart-label">Cart</span>
          </div>
        </header>
        <div class="widget-grid" onTouchStart={(e) => StoreLevelController.click(-1, e) }>
          {this.state.widgets.map(widgetState => <Widget {...widgetState} />)}
        </div>
        <FailModal isOpen={this.state.showFailModal} xAdjust={this.state.failModalAdjustX} yAdjust={this.state.failModalAdjustY} />
      </div>
    );
  }

}
