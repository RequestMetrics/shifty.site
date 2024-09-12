import { Component } from "preact";
import { SignupModal } from "./SignupModal";

import "./Launcher.css";

export class Launcher extends Component<any, any> {

    constructor() {
        super();

        this.state = {
            isLeaderboardModalOpen: false,
            isSignupModalOpen: true
        };
    }

    render() {
        return (
            <>
                <div class="store-level">
                    <header class="store-header">
                        <div class="logo">
                            <img src="/images/logo.png" width="136" height="80" />
                        </div>
                        <div class="cart">
                            <span class="cart-count">{this.state.cart}</span>
                            <img src="/images/cart.svg"></img>
                            <span class="cart-label">Cart</span>
                        </div>
                    </header>
                    <div class="widget-grid"></div>
                </div>
                <SignupModal isOpen={this.state.isSignupModalOpen} onClose={() => this.setState({ isSignupModalOpen: false })} />
            </>
        )
    }
}