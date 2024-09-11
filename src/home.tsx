import { render } from 'preact'

import '@/home.css';

/**
 * Most of the content on the homepage is static.
 * @returns
 */

// import './main.scss'
// import Home from './pages/Home.tsx'
// const Game = lazy(() => import('./pages/Game.tsx'));
// const NotFound = lazy(() => import('./pages/NotFound.tsx'));

const Main = () => (
    <h1 class="ext-3xl font-bold underline">Main!</h1>
)

render(<Main />, document.getElementById('home')!)
