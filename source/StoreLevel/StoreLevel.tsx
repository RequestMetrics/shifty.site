import { h, Component } from "preact";
import { StoreLevelController, StoreLevelState } from "./StoreLevelController";
import { Widget } from "./Widget";


export class StoreLevel extends Component<any, StoreLevelState> {

  constructor() {
    super();
    StoreLevelController.init(() => this.state, this.setState.bind(this));
  }

  render() {
    return(
      <div class="product-grid">
        {this.state.widgets.map(widgetState => <Widget {...widgetState} />)}
      </div>
    );
  }

}
