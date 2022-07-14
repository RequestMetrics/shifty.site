import { h, Component } from "preact";
import { WidgetState } from "./LevelEcommerce";
import "./Widget.scss";

export class Widget extends Component<WidgetState, any> {

  render() {

    var content;
    if (this.props.isLoading) {
      content = this.renderLoading();
    }
    else if (this.props.isObjective) {
      content = this.renderObjective();
    }
    else {
      content = <h3>I am a widget {this.props.index}</h3>
    }

    return (
      <div class="widget" style={{"flex": `1 0 ${this.props.width}%`,"height": `${this.props.height}px`}}>
        {content}
      </div>
    )
  }

  private renderLoading() {
    return (
      <h4>loading...</h4>
    )
  }

  private renderObjective() {
    return (
      <button type="button">CLICK</button>
    )
  }
}