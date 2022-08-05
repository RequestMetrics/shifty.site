import { h, Component } from "preact";
import { GameController, level } from "./GameController";
import { Modal, ModalProps } from "./Modal/Modal";

export interface FinishModalProps extends ModalProps {
  won: boolean
}

export class FinishModal extends Component<FinishModalProps, any> {

  render(): h.JSX.Element {
    let headline, img;
    if (this.props.won) {
      headline = "You Got the Deals!";
      img = "/assets/images/clap_500_apng.png";
    }
    else {
      headline = "You Lost the Deals!";
      img = "/assets/images/sob_500_apng.png";
    }
    return (
      <Modal content={
        <div class="finish-modal flex flex-column align-center text-center">
          <h2>{headline}</h2>
          <div class="illustration">
            <img src={img} alt="Sloth" height="500" width="500" />
          </div>
          <p>
            This page shifted <strong style="color:red">{GameController.cls.toFixed(4)}</strong> while loading.<br/>
            That's really frustrating.
          </p>
          <div class="cta flex flex-column align-center text-center">
            <p>
              Discover how your website shifts and your real-user experience with <strong>Request Metrics</strong>.
            </p>
            <div class="logo">
              <img src="/assets/images/request_metrics_logo.svg" alt="Request Metrics" width="300" height="102" />
            </div>
          </div>

          <div class="controls flex justify-center">
            <button class="btn btn-blue" onClick={() => GameController.reset()}>Start Over</button>
          </div>
        </div>
      } isOpen={this.props.isOpen} />
    );
  }
}