// import { LeaderboardModal } from "./LeaderboardModal";
// import { SignupModal } from "./SignupModal";

import { Component } from "preact";
import { Modal, ModalProps } from "./Modal";

// import "./Launcher.css";

interface GameLauncherState {
    modalOpen: boolean
}

export class GameLauncher extends Component<any, GameLauncherState> {

    // constructor() {
    //     super();

    //     this.state = {
    //         isLeaderboardModalOpen: false,
    //         isSignupModalOpen: false
    //     };
    // }


    render() {
        return (
            <>
                <button type="button" class="btn"
                    onClick={() => this.setState({ modalOpen: true })}>
                    Play
                </button>
                <GameInfoModal isOpen={this.state.modalOpen} />
            </>
        )
    }

    showGameInfo() {

    }
}

class GameInfoModal extends Component<ModalProps, any> {
    render() {
        return (
            <Modal content={
                <div class="signup-modal flex flex-column">
                    <h2>First, We Need Your Email</h2>
                    <p class="text-center">
                        We’ll send you information about <strong>Cumulative Layout Shift</strong> (CLS) and how to fix it.
                        Unsubscribe at any time.
                    </p>

                    <form class="flex flex-column" onSubmit={(e) => this.saveForm(e)} >

                        <h3 class="text-center" style="margin:20px 0 ">Have we scanned your badge?</h3>

                        {/* <label>
              <span>Your Name</span>
              <input type="text" name="name" value={this.state.formName} required placeholder="Jane Doe" />
            </label>

            <label>
              <span>Your Email</span>
              <input type="email" name="email" value={this.state.formName} required placeholder="jane@example.com" />
            </label> */}

                        <div class="controls flex justify-center">
                            <button type="submit" class="btn btn-blue">Start</button>
                            <button type="button" class="btn btn-grey" onClick={() => this.props.onClose?.call(this)}>Cancel</button>
                        </div>

                    </form>

                </div>
            } isOpen={this.props.isOpen} onClose={this.props.onClose} />
        );
    }
}