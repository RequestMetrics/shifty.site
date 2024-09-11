import { h, Component, ComponentChild, VNode } from "preact";
import { PLAYER_STORAGE_KEY } from "../constants";
import { Modal, ModalProps } from "./Modal";
import { getAccuracy, getLocalStorage } from "../lib";

export class LeaderboardModal extends Component<ModalProps, any> {

    render(): h.JSX.Element {
        let players = getLocalStorage(PLAYER_STORAGE_KEY) || [];
        players = players
            .sort((a: { cart: any; }, b: { cart: any; }) => {
                let a1 = (a.cart || 0);
                let b1 = (b.cart || 0);
                if (a1 < b1) { return -1; }
                else { return 1; }
            })
            .reverse()
            .filter((_p: any, idx: number) => idx < 10);

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
                        {players.map((player: { name: string | number | bigint | boolean | object | ComponentChild[] | VNode<any> | null | undefined; cart: number; clicks: number; }) => (
                            <tr class="player">
                                <td>{player.name}</td>
                                <td>{player.cart || 0}</td>
                                <td>{getAccuracy(player.cart, player.clicks)}</td>
                            </tr>
                        ))}
                    </table>
                    <div class="controls flex justify-center" style="margin-top:20px;">
                        <button type="button" class="btn btn-grey" onClick={() => this.props.onClose?.call(this)}>Close</button>
                    </div>
                </div>
            } isOpen={this.props.isOpen} onClose={this.props.onClose} />
        );
    }

}