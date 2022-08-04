import { h, Component } from "preact";
import { GameController, level } from "../GameController";
import "./Launcher.scss";

export class Launcher extends Component<any, any> {


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
              <button type="button" onClick={e => GameController.start(level.STORE) }>Start!</button>
            </div>

          </div>

        </div>



      </div>
    )
  }
}