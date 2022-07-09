import { h, Component } from "preact";

export class Widget extends Component<any, any> {

  render() {
    return (
      <div style={{"flex": `1 0 ${this.props.width}%`}}>
        <h3>I am a widget {this.props.index}</h3>
      </div>
    )
  }
}