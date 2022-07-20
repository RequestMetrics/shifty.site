import { h, Component } from "preact";
import { GameController, level } from "../GameController";
import "./Launcher.scss";

export class Launcher extends Component<any, any> {


  render() : h.JSX.Element {
    return (
      <div class="launcher">
        <div class="container flex flex-column">
          <h2>You’re Running Out Of Time!</h2>

          <div class="launch-content flex">

            <div class="illustration">
              <img src="/assets/images/deal-of-the-day.png" height="600" width="600" />
            </div>

            <div class="instructions">
              <p>
                GreatGets is giving away 3 free ThingsYouWant&trade; for the next 30 seconds!
                Can you add all three to your cart?
              </p>
              <p>
                But the GreatGets website loads tons async content in
                different sizes, causing the layout to shift around constantly.
              </p>
              <button type="button" onClick={e => GameController.start(level.STORE) }>Start!</button>
            </div>

          </div>

        </div>



      </div>
    )
  }
}