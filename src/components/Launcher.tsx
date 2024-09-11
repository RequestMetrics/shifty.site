import { h, Component } from "preact";
import { LeaderboardModal } from "./LeaderboardModal";
import { SignupModal } from "./SignupModal";

import "./Launcher.scss";

export class Launcher extends Component<any, any> {

    constructor() {
        super();

        this.state = {
            isLeaderboardModalOpen: false,
            isSignupModalOpen: false
        };
    }


    render(): h.JSX.Element {
        return (
            <div class="launcher">
                <div class="container flex flex-column">
                    <h2>Get the deals before they’re gone!</h2>

                    <div class="launch-content flex">
                        <div class="illustration">
                            <img src="/images/deal-of-the-day.png" height="600" width="600" />
                        </div>
                        <div class="instructions">
                            <p>
                                The GreatGets website sucks. It loads async content in random
                                sizes, causing frustrating <strong>layout shifts</strong>.
                            </p>
                            <p>
                                They have awesome deals though, but only for 30 seconds!
                                How many can you add before time runs out?
                            </p>
                            <p>
                                Watch out for the annoying popups!
                            </p>
                            <div class="controls flex justify-center">
                                <button type="button" class="btn btn-blue"
                                    onClick={() => this.setState({ isSignupModalOpen: true })}
                                // onClick={e => GameController.start(level.STORE) }
                                >Start!</button>
                                {/* <button type="button" class="btn btn-grey" onClick={() => this.setState({isLeaderboardModalOpen:true})}>Scores</button> */}
                            </div>
                        </div>
                    </div>

                    <div class="rm-logo flex flex-column align-center">
                        <h4 style="font-weight: normal">Developed By</h4>
                        <a href="https://requestmetrics.com/">
                            <img src="/images/request_metrics_logo.svg" alt="Request Metrics" width="300" height="102" />
                        </a>
                    </div>

                    <div class="sloth-this">
                        <img src="/images/this_500_apng.png" width="500" height="500" />
                    </div>

                </div>

                <SignupModal isOpen={this.state.isSignupModalOpen} onClose={() => this.setState({ isSignupModalOpen: false })} />
                <LeaderboardModal isOpen={this.state.isLeaderboardModalOpen} onClose={() => this.setState({ isLeaderboardModalOpen: false })} />

            </div>
        )
    }
}