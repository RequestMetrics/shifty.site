import { Component, render } from 'preact'
import { ScoreBoard } from '@/components/ScoreBoard';

import '@/Home.scss';
import { Modal } from './components/Modal';

class HomeGameControls extends Component<any, any> {
    closeModal() {
        this.setState({ modalOpen: false });
    }
    render() {
        return (
            <>
                <a href="/game" class="btn btn-primary">Play</a>
                <button type="button" class="btn btn-ghost"
                    onClick={() => this.setState({ modalOpen: true })}>
                    How to play
                </button>
                <Modal isOpen={this.state.modalOpen}>
                    <div class="how-modal-wrap flex-column">
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
                            <button type="button" class="btn" onClick={() => this.closeModal()}>Close Help</button>
                        </footer>
                    </div>
                </Modal>
            </>
        )
    }
}

render(<HomeGameControls />, document.getElementById("game-controls")!)
render(<ScoreBoard />, document.getElementById("score-board")!)




// // import './main.scss'
// // import Home from './pages/Home.tsx'
// // const Game = lazy(() => import('./pages/Game.tsx'));
// // const NotFound = lazy(() => import('./pages/NotFound.tsx'));

// const Main = () => (
//     <h1 class="ext-3xl font-bold underline">Main!</h1>
// )

// render(<Main />, document.getElementById('home')!)
