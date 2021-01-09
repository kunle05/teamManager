import React from 'react';
import { Link, navigate, Router } from "@reach/router"
import PlayerComponent from "./components/players"
import StatusComponent from './components/status';
import PlayerList from './components/playerList';
import AddPlayer from './components/addPlayer';
import GameStat from './components/game';

const App = () => {
    if(window.location.pathname === "/" || window.location.pathname === "/players" || window.location.pathname === "/players/") {
        navigate("players/list")
    }
    if(window.location.pathname === "/status/game" || window.location.pathname === "/status/game/") {
        navigate("status/game/1")
    }
    return (
        <div className="container col-10 p-0 bg-light pb-3">
            <nav className="navbar navbar-expand-lg navbar-light bg-dark my-4">
                <ul className="navbar-nav">
                    <li className="nav-item active mr-5" style={{fontSize: "24px"}}>
                        <Link to="players/list" className="nav-link text-primary">Manage Players</Link>
                    </li>
                    <li className="nav-item" style={{fontSize: "24px"}}>
                        <Link to="status/game/5ff80237fb49e31abd1caa71" className="nav-link text-primary">Game Status</Link>
                    </li>
                </ul>
            </nav>
            <Router>
                <PlayerComponent path="players">
                    <PlayerList path="list" />
                    <AddPlayer path="new" />
                </PlayerComponent>
                <StatusComponent path="status">
                    <GameStat path="game/:id" />
                </StatusComponent>
            </Router>
        </div>
    )
}

export default App