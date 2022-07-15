import { h, Component } from "preact";
import { getRandomInteger } from "../util/getRandomInteger";
import { StoreLevelController, WidgetState, WidgetStatus } from "./StoreLevelController";
import "./Widget.scss";

export class Widget extends Component<WidgetState, any> {

  // componentDidMount(): void {
  //   this.timer = setInterval(() => {
  //     if (getRandomInteger(0, 10) < 5) { return; } // Randomness!

  //     if (this.state.status === WidgetStatus.EMPTY) {
  //       this.setState({
  //         status: WidgetStatus.LOADING,
  //       });
  //     }
  //     else if (this.state.status === WidgetStatus.LOADING) {
  //       if (!StoreLevelController.isObjectiveVisible()) {
  //         this.setState({
  //           status: WidgetStatus.OBJECTIVE
  //         });
  //         EcommerceStore.setObjective(this.props.index);
  //       }
  //       else {
  //         this.setState({
  //           status: WidgetStatus.CONTENT
  //         });
  //       }
  //     }
  //     else if (this.state.status === WidgetStatus.OBJECTIVE) {
  //       this.setState({
  //         status: WidgetStatus.LOADING
  //       });
  //       EcommerceStore.setObjective(-1);
  //     }
  //     else {
  //       // ... nothing to do
  //     }
  //   }, 500);
  // }

  render(): h.JSX.Element {

    let width : number;
    let height : number;
    let content : h.JSX.Element;

    if (this.props.status === WidgetStatus.EMPTY) {
      width = 0;
      height = 0
      content = null;
    }
    else if (this.props.status === WidgetStatus.LOADING) {
      width = 10;
      height = 140
      content = (<h4>loading...</h4>);
    }
    else if (this.props.status === WidgetStatus.CONTENT) {
      width = this.getRandomWidth();
      height = this.getRandomHeight();
      content = (<h3>I am a widget {this.props.index}</h3>);
    }
    else if (this.props.status === WidgetStatus.OBJECTIVE) {
      width = 10;
      height = 140;
      content = (<button type="button">CLICK</button>);
    }
    else if (this.props.status === WidgetStatus.COMPLETE) {
      width = 10;
      height = 140;
      content = (<h3>DONE</h3>);
    }
    else {
      throw new Error(`Widget ${this.props.index} in unknown status ${this.props.status}.`);
    }

    return (
      <div class="widget" style={{
          "flex": `1 0 ${width}%`,
          "height": `${height}px`,
          "display": `${this.props.status === WidgetStatus.EMPTY ? "none" : "flex" }`}}
        onClick={ () => StoreLevelController.click(this.props.index)}>
        {content}
      </div>
    )
  }

  private getRandomWidth() : number {
    const WIDTHS = [25,25,25,25,25,33,33,33,33,33,50,50,100];
    return WIDTHS[getRandomInteger(0, WIDTHS.length)];
  }

  private getRandomHeight() : number {
    const HEIGHTS = [50,100,200];
    return HEIGHTS[getRandomInteger(0, HEIGHTS.length)];
  }
}