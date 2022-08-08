import { DateTime } from "luxon";
import { h, Component } from "preact";
import { GameController, level } from "../GameController";
import { Modal, ModalProps } from "../Modal/Modal";
import { getLocalStorage, setLocalStorage } from "../util/xetLocalStorage";

export class SignupModal extends Component<ModalProps, any> {

  render(): h.JSX.Element {
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
              <button type="button" class="btn btn-grey" onClick={() => this.props.onClose()}>Cancel</button>
            </div>

          </form>

        </div>
      } isOpen={this.props.isOpen} onClose={this.props.onClose}/>
    );
  }

  saveForm(event: Event) {
    event.preventDefault();
    let form = event.target as HTMLFormElement;

    // GameController.setState({
    //   name: form.elements['name'].value,
    //   email: form.elements['email'].value,
    //   timestamp:  DateTime.now()
    // });

    this.props.onClose();
    GameController.start(level.STORE);
  }

}