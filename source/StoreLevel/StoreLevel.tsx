import { h, Component } from "preact";
import { StoreLevelController, StoreLevelState } from "./StoreLevelController";
import { Widget } from "./Widget";
import "./StoreLevel.scss";


export class StoreLevel extends Component<any, StoreLevelState> {

  constructor() {
    super();
    StoreLevelController.init(() => this.state, this.setState.bind(this));
  }

  render() {
    return(
      <div class="store-level">
        <div class="widget-grid" onTouchStart={(e) => StoreLevelController.click(-1, e) }>
          {this.state.widgets.map(widgetState => <Widget {...widgetState} />)}
        </div>
      </div>
    );
  }

}
