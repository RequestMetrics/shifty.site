import { useState } from "preact/hooks";
import { GameController } from "@/controllers/GameController";
import { Modal, ModalProps } from "@/components/Modal";
import { getAccuracy } from "@/lib";

import "./FinishModal.scss";

export interface FinishModalProps extends ModalProps {
    cart: number,
    clicks: number
    cls: number
}

export const FinishModal = (props: FinishModalProps) => {

    const [copyButtonText, setCopyButtonText] = useState("Copy");

    const imgSrc = (props.cart > 0) ?
        "/images/clap_500_apng.png" :
        "/images/sob_500_apng.png";

    const shareText = `I got ${props.cart} daily deals with ${getAccuracy(props.cart, props.clicks)} accuracy on ShiftySite, the Layout Shift game.`;
    const shareTextWithUrl = `${shareText}\n\nhttps://shifty.site/`;

    return (
        <div class="finish-modal-wrap">
            <Modal isOpen={props.isOpen}>
                <div class="finish-modal flex flex-column align-center">
                    <header class="text-center">
                        <h2>You got {props.cart} daily deals!</h2>
                    </header>

                    <div class="finish-content flex  align-center">
                        <picture class="illustration">
                            <img src={imgSrc} alt="Sloth" height="200" width="200" />
                        </picture>
                        <div class="finish-text">
                            <p>
                                You clicked <strong>{props.clicks}</strong> times with <strong>{getAccuracy(props.cart, props.clicks)}</strong> accuracy.
                            </p>
                            <p>
                                The <a href="https://requestmetrics.com/web-performance/cumulative-layout-shift/?utm_source=shifty">Cumulative Layout Shift (CLS)</a> for the site was <strong>{props.cls.toFixed(4)}</strong>, which is <strong style="color:red">Poor</strong> and will hurt their pagerank and traffic.
                            </p>
                            <p>
                                You can check if your website has CLS problems using the <a href="https://requestmetrics.com/resources/tools/crux/?utm_source=shifty">
                                    free Speed Check Tool</a>.
                            </p>
                        </div>

                    </div>

                    <div class="cta flex flex-column">
                        <h3>Share Your Score!</h3>
                        <div class="preview flex align-center">
                            <pre class="text">{shareTextWithUrl}</pre>
                            <button class="btn btn-ghost"
                                onClick={() => {
                                    navigator.clipboard.writeText(shareTextWithUrl);
                                    setCopyButtonText("Copied")
                                    setTimeout(() => { setCopyButtonText("Copy"); }, 1500);
                                }}
                            >
                                {copyButtonText}
                            </button>
                        </div>
                        <div class="share-links flex">
                            <a href={`https://twitter.com/share?text=${encodeURIComponent(shareText + "\n\n")}&url=${encodeURIComponent("https://shifty.site/?utm_source=share-x")}`} title="Share to X">
                                <img src="/images/icon_x.svg" alt="X" width="100" height="100" />
                            </a>
                            <a href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent("https://shifty.site/?utm_source=share-facebook")}`} title="Share to Facebook">
                                <img src="/images/icon_facebook.svg" alt="Facebook" width="100" height="100" />
                            </a>
                            <a href={`https://www.linkedin.com/cws/share?url=${encodeURIComponent("https://shifty.site/?utm_source=share-linkedin")}`} title="Share to LinkedIn">
                                <img src="/images/icon_linkedin.svg" alt="LinkedIN" width="100" height="100" />
                            </a>
                        </div>
                    </div>

                    <div class="controls flex justify-center">
                        <button type="button" class="btn btn-primary" onClick={() => GameController.reset()}>Play Again</button>
                        <a href="/" class="btn btn-ghost">Quit</a>
                    </div>
                </div>
            </Modal >
        </div>
    );

}