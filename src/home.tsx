import { render } from 'preact'
import { GameLauncher } from '@/components/GameLauncher';
import { ScoreBoard } from '@/components/ScoreBoard';

import '@/Home.scss';

render(<GameLauncher />, document.getElementById("game-launcher")!)
render(<ScoreBoard />, document.getElementById("score-board")!)




// // import './main.scss'
// // import Home from './pages/Home.tsx'
// // const Game = lazy(() => import('./pages/Game.tsx'));
// // const NotFound = lazy(() => import('./pages/NotFound.tsx'));

// const Main = () => (
//     <h1 class="ext-3xl font-bold underline">Main!</h1>
// )

// render(<Main />, document.getElementById('home')!)
