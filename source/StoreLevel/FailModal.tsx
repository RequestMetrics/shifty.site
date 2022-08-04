import { h, Component } from "preact";
import { Modal, ModalProps } from "../Modal/Modal";
import { StoreLevelController } from "./StoreLevelController";

export class FailModal extends Component<ModalProps, any> {

  render(): h.JSX.Element {
    return (
      <Modal content={
        <div class="newsletter-modal">
            <h2>Join Our Newsletter and Save!</h2>
            <h3>A Really Annoying Popup</h3>
            <p>
              Join our newsletter and we'll send you 10 emails every day about
              crappy products that we can't sell.
            </p>
            <p>
              <strong>Your Shopping Cart has been emptied.</strong>
            </p>
            <button type="button" onTouchStart={ () => StoreLevelController.doubleFail() }>Yes! Add Me To Your Newsletter</button>
            <a href="javascript:void(0)" onTouchStart={ () => StoreLevelController.clearFail() }>No, Go Back</a>
          </div>
      } isOpen={this.props.isOpen} xAdjust={this.props.xAdjust} yAdjust={this.props.yAdjust}/>
    );
  }

}