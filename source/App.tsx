import { h, Component } from "preact";
import { Route, Router } from "preact-router";
import Home from "./routes/Home";
import Game from "./routes/Game";

const App = () => {
    return (
        <main id="app2">
            <Router>
                <Route path="/" component={Home} />
                <Route path="/game" component={Game} />
            </Router>
        </main>
    );
}

export default App;