import { Component } from 'preact'
import { Modal, ModalProps } from '@/components/Modal';

import "./GameInfoModal.scss";

export interface GameInfoModalProps extends ModalProps {
    closeButtonText: string
    onClose: () => void
}

export class GameInfoModal extends Component<GameInfoModalProps, any> {
    render(props: GameInfoModalProps) {
        return (
            <Modal isOpen={props.isOpen}>
                <div class="game-info-modal flex-column">
                    <header>
                        <h2>How to play</h2>
                    </header>
                    <div class="how-content flex-column">
                        <picture class="how-illustration">
                            <img src="/images/explainer-landscape.png" loading="lazy" width="600" height="300" alt="Click the Deal of the Day" />
                        </picture>
                        <div class="how-text">
                            <p>
                                You are about to load the GreatGets online store. The site
                                loads products slowly, causing the layout to shift around,
                                violently.
                            </p>
                            <p>
                                Dodge the shifting products and add as many <strong>"Deal of the Day"</strong> products
                                into your cart before the time runs out.
                            </p>
                        </div>

                    </div>
                    <footer class="flex-column justify-center">
                        <button type="button" class="btn btn-primary" onClick={() => props.onClose()}>{props.closeButtonText}</button>
                    </footer>
                </div>
            </Modal>
        )
    }
}
