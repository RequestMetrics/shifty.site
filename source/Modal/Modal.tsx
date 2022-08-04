import { h, Component } from "preact";
import "./Modal.scss";

export interface ModalProps {
  isOpen: boolean,
  content?: h.JSX.Element,
  xAdjust?: number,
  yAdjust?: number,
  onClose?: Function
}

export class Modal extends Component<ModalProps, any> {

  render(): h.JSX.Element {
    return (
      <div class="modal-wrap" style={{"display": this.props.isOpen ? "flex" : "none"}}>
        <div class="modal-box" style={{
          "margin-top": `${this.props.yAdjust || 0}vh`,
          "margin-left": `${this.props.xAdjust || 0}vw`
          }}>
          {this.props.content}
        </div>
      </div>
    );
  }
}