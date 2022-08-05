import { h, Component } from "preact";
import { PLAYER_STORAGE_KEY } from "../Constants";
import { Modal, ModalProps } from "../Modal/Modal";
import { getAccuracy } from "../util/getAccuracy";
import { getLocalStorage, setLocalStorage } from "../util/xetLocalStorage";

export class LeaderboardModal extends Component<ModalProps, any> {

  render(): h.JSX.Element {
    let players = getLocalStorage(PLAYER_STORAGE_KEY) || [];
    players = players
      .sort((a, b) => {
        let a1 = (a.cart || 0);
        let b1 = (b.cart || 0);
        if (a1 < b1) { return -1; }
        else { return 1; }
      })
      .reverse()
      .filter((p, idx) => idx < 10);

    return (
      <Modal content={
        <div class="leaderboard-modal flex flex-column">
          <h2>Leaderboard</h2>
          <table class="scores ">
            <tr class="header">
              <th>Name</th>
              <th>Cart</th>
              <th>Accuracy</th>
            </tr>
            {players.map((player) => (
              <tr class="player">
                <td>{player.name}</td>
                <td>{player.cart || 0}</td>
                <td>{getAccuracy(player.cart, player.clicks)}</td>
              </tr>
            ))}
          </table>
          <div class="controls flex justify-center" style="margin-top:20px;">
            <button type="button" class="btn btn-grey" onClick={() => this.props.onClose()}>Close</button>
          </div>
        </div>
      } isOpen={this.props.isOpen} onClose={this.props.onClose}/>
    );
  }

}