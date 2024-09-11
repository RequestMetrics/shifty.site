import { h, Component } from "preact";
import { Modal, ModalProps } from "../components/Modal";
import { StoreLevelController } from "./StoreLevelController";

export class FailModal extends Component<ModalProps, any> {

    render(): h.JSX.Element {
        return (
            <Modal content={
                <div class="newsletter-modal">
                    <h2>Join Our Newsletter and Save!</h2>
                    <h3>A Really Annoying Popup</h3>
                    <p style="margin:40px 0;">
                        Join our newsletter and we'll send you 10 emails every day!
                    </p>
                    <button type="button" onMouseDown={(e) => StoreLevelController.doubleFail(e)} onTouchStart={(e) => StoreLevelController.doubleFail(e)}>Yes! Add Me To Your Newsletter</button>
                    <a href="javascript:void(0)" onMouseDown={(e) => StoreLevelController.clearFail(e)} onTouchStart={(e) => StoreLevelController.clearFail(e)}>No, Go Back</a>
                </div>
            } isOpen={this.props.isOpen} xAdjust={this.props.xAdjust} yAdjust={this.props.yAdjust} />
        );
    }

}