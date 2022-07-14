import { h, Component } from "preact";
import { getRandomInteger } from "../util/getRandomInteger";
import { Widget } from "./Widget";

const NUMBER_OF_WIDGETS = 10;

export interface EcommerceLevelState {
  widgets : WidgetState[]
}

export interface WidgetState {
  index : number
  isLoading : boolean
  isObjective :  boolean
  width : number
  height : number
}

export class EcommerceLevel extends Component<any, EcommerceLevelState> {


  private isObjectiveVisible: boolean = false;

  constructor() {
    super();

    this.state = {
      widgets: []
    };

    for(var i = 0; i < NUMBER_OF_WIDGETS; i++) {
      this.state.widgets.push({
        index: i,
        isLoading: true,
        isObjective: false,
        width: 10,
        height: 140
      });
    }

    setTimeout(() => this.tick());
  }

  render() {
    return(
      <div class="product-grid">
        {this.state.widgets.map(widgetState => <Widget {...widgetState} />)}
      </div>
    );
  }

  private tick() : void {
    let widget = this.state.widgets[getRandomInteger(0, this.state.widgets.length)];
    widget.isLoading = true;
    widget.width = 10;
    widget.height = 140;

    if (widget.isObjective) {
      widget.isObjective = false;
      this.isObjectiveVisible = false;
    }

    setTimeout(() => {
      widget.isLoading = false;

      if (!this.isObjectiveVisible && widget.index >= 3) {
        this.isObjectiveVisible = true;
        widget.isObjective = true;
        widget.width = 10;
        widget.height = 50;
      }
      else {
        widget.width = this.getItemWidth();
        widget.height = this.getItemHeight();
      }

      this.setState(this.state);
    }, this.getLoadingInterval());

    this.setState(this.state);
    this.setupNextTick();
  }

  private setupNextTick() {
    setTimeout(() => this.tick(), this.getTickInterval())
  }

  private getTickInterval() : number {
    return getRandomInteger(300, 800)
  }

  private getLoadingInterval() : number {
    return getRandomInteger(100, 2_000);
  }

  private getItemWidth() : number {
    const WIDTHS = [25,25,25,25,25,33,33,33,33,33,50,50,100];
    return WIDTHS[getRandomInteger(0, WIDTHS.length)];
  }

  private getItemHeight() : number {
    const HEIGHTS = [50,100,200];
    return HEIGHTS[getRandomInteger(0, HEIGHTS.length)];
  }

}
