import React from "react"
import { Link, Router } from "@reach/router"
import PlayerList from './playerList';
import AddPlayer from "./addPlayer";

const PlayerComponent = () => {
    return (
        <div className="bg-light container col-11">
            <ul className="list-inline border-bottom">
                <li className="list-inline-item mr-5" style={{fontSize: "20px"}}>
                    <Link to="list" className="nav-link text-primary">List</Link>
                </li>
                <li className="list-inline-item" style={{fontSize: "20px"}}>
                    <Link to="new" className="nav-link text-primary">Add player</Link>
                </li>
            </ul>
            <Router>
                <PlayerList path="list" />
                <AddPlayer path="new" />
            </Router>
        </div>
    )
}

export default PlayerComponent