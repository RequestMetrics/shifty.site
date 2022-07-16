import { h, Component } from "preact";
import { StoreLevelController } from "./StoreLevelController";

export interface FailModalProps {
  isOpen: boolean
  yAdjust: number
  xAdjust: number
}

export class FailModal extends Component<FailModalProps, any> {

  render(): h.JSX.Element {
    return (
      <div class="modal-wrap" style={{"display": this.props.isOpen ? "flex" : "none"}}>
        <div class="modal-box" style={{
          "margin-top": `${this.props.yAdjust}vh`,
          "margin-left": `${this.props.xAdjust}vw`
          }}>
          <div class="newsletter-modal">
            <h2>Join Our NewsLetter and Save!</h2>
            <h3>A Really Annoying Popup</h3>
            <p>
              Join our newsletter and we'll send you 10 emails every day about
              crappy products that we can't sell.
            </p>
            <p>
              <strong>Your Shopping Cart has been emptied.</strong>
            </p>
            <button type="button" onClick={ () => StoreLevelController.doubleFail() }>Yes! Add Me To Your Newsletter</button>
            <a href="javascript:void(0)" onClick={ () => StoreLevelController.clearFail() }>No, Go Back</a>
          </div>
        </div>
      </div>
    );
  }

}