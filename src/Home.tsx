import { Component, render } from 'preact'
import { RM } from '@request-metrics/browser-agent';
import { ScoreBoard } from '@/components/ScoreBoard';
import { GameInfoModal } from './components/GameInfoModal';

import '@/Home.scss';

RM.install({
    token: "h8an2rr:w3qi7wr"
});

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
                <GameInfoModal isOpen={this.state.modalOpen} onClose={this.closeModal.bind(this)} closeButtonText='Close Help' />
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
