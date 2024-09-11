import { render } from 'preact'
import { ErrorBoundary, lazy, LocationProvider, Router } from 'preact-iso'

import './main.scss'
import Home from './pages/Home.tsx'
const Game = lazy(() => import('./pages/Game.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

const Main = () => (
    <LocationProvider>
        <ErrorBoundary>
            <Router>
                <Home path="/" />
                <Game path="/game" />
                <NotFound path="*" />
            </Router>
        </ErrorBoundary>
    </LocationProvider>
)

render(<Main />, document.getElementById('app')!)
