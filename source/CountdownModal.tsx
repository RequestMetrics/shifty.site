import { h, Component } from "preact";
import { Modal, ModalProps } from "./Modal/Modal";

export interface CountdownModalProps extends ModalProps {
  number: number
}

export class CountdownModal extends Component<CountdownModalProps, any> {

  render(): h.JSX.Element {
    return (
      <Modal content={
        <div class="countdown-modal flex flex-column">
          <h2>{this.props.number}</h2>
        </div>
      } isOpen={this.props.isOpen} />
    );
  }
}