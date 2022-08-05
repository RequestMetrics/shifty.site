import { h, Component } from "preact";
import { GameController, level } from "../GameController";
import "./Launcher.scss";
import { SignupModal } from "./SignupModal";

export class Launcher extends Component<any, any> {

  constructor() {
    super();

    this.state ={
      isSignupModalOpen: false
    };
  }


  render() : h.JSX.Element {
    return (
      <div class="launcher">
        <div class="container flex flex-column">
          <h2>Get the deals before they’re gone!</h2>

          <div class="launch-content flex">
            <div class="illustration">
              <img src="/assets/images/deal-of-the-day.png" height="600" width="600" />
            </div>
            <div class="instructions">
              <p>
                The GreatGets website sucks. It loads async content in random
                sizes, causing frustrating <strong>layout shifts</strong>.
              </p>
              <p>
                They are giving away 3 deals, but only for 30 seconds!
                Can you add all 3 to your cart before the time runs out?
              </p>
              <p>
                Watch out for the annoying popups!
              </p>
              <button type="button" class="btn btn-blue" onClick={e => this.setState({isSignupModalOpen:true}) }>Start!</button>
            </div>
          </div>

          <div class="rm-logo flex flex-column align-center">
            <h4 style="font-weight: normal">Developed By</h4>
            <a href="https://requestmetrics.com/">
              <img src="/assets/images/request_metrics_logo.svg" alt="Request Metrics" width="300" height="102" />
            </a>
          </div>

          <div class="sloth-this">
            <img src="/assets/images/this_500_apng.png" width="500" height="500" />
          </div>

        </div>

        <SignupModal isOpen={this.state.isSignupModalOpen} onClose={() => this.setState({isSignupModalOpen:false})} />

      </div>
    )
  }
}