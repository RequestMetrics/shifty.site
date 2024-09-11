import { h, Component } from "preact";
import { Modal, ModalProps } from "../components/Modal";
import { StoreLevelController } from "./StoreLevelController";

export class ExperienceModal extends Component<ModalProps, any> {

    render(): h.JSX.Element {
        return (
            <Modal content={
                <div class="experience-modal flex flex-column">
                    <h2>Help Improve Our Website</h2>
                    <button class="close"
                        onMouseDown={(e) => StoreLevelController.clearExperience(e)}
                        onTouchStart={(e) => StoreLevelController.clearExperience(e)}
                    >✕</button>
                    <p>
                        Tell us about your experience on our website! We promise to ignore
                        it entirely.
                    </p>
                    <div class="ratings flex flex-column justify-center">
                        <div class="title">
                            Would you to recommend GreatGets to a friend?
                        </div>
                        <div class="labels flex">
                            <div>Not Likely</div>
                            <div>Very Likely</div>
                        </div>
                        <div class="controls flex">
                            <label onMouseDown={(e) => StoreLevelController.clickRatings(e)} onTouchStart={(e) => StoreLevelController.clickRatings(e)}>
                                <input type="radio"></input>
                                <span>1</span>
                            </label>
                            <label onMouseDown={(e) => StoreLevelController.clickRatings(e)} onTouchStart={(e) => StoreLevelController.clickRatings(e)}>
                                <input type="radio"></input>
                                <span>2</span>
                            </label>
                            <label onMouseDown={(e) => StoreLevelController.clickRatings(e)} onTouchStart={(e) => StoreLevelController.clickRatings(e)}>
                                <input type="radio"></input>
                                <span>3</span>
                            </label>
                            <label onMouseDown={(e) => StoreLevelController.clickRatings(e)} onTouchStart={(e) => StoreLevelController.clickRatings(e)}>
                                <input type="radio"></input>
                                <span>4</span>
                            </label>
                            <label onMouseDown={(e) => StoreLevelController.clickRatings(e)} onTouchStart={(e) => StoreLevelController.clickRatings(e)}>
                                <input type="radio"></input>
                                <span>5</span>
                            </label>
                        </div>
                    </div>
                </div>
            } isOpen={this.props.isOpen} xAdjust={this.props.xAdjust} yAdjust={this.props.yAdjust} />
        );
    }

}

export class ExperienceThanksModal extends Component<ModalProps, any> {

    render(): h.JSX.Element {
        return (
            <Modal content={
                <div class="experience-thanks-modal flex flex-column">
                    <h2>Thanks for your Rating!</h2>
                    <h3>Expect a lot of survey emails from us!</h3>
                    <button class="close"
                        onTouchStart={(e) => StoreLevelController.clearRatingsThanks(e)}
                        onMouseDown={(e) => StoreLevelController.clearRatingsThanks(e)}
                    >✕</button>
                    <p style={{ flex: "1 1 auto" }}>
                        We recorded your rating! We will continue to ask you over email every 2-3 days
                        from now until eternity, regardless if you ever shop with us again.
                    </p>
                </div>
            } isOpen={this.props.isOpen} xAdjust={this.props.xAdjust} yAdjust={this.props.yAdjust} />
        );
    }

}