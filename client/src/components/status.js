import React, { useEffect, useState } from "react"
import { Link, Router } from "@reach/router"
import axios from "axios"
import GameStat from "./game";

const StatusComponent = () => {
    const [games, setGames] = useState([]);
    const [showName, setShowName] = useState("");

    useEffect(() => {
        const fetchGames = async () => {
            let result = await axios.get("http://localhost:8200/games") 
            setGames(result.data);
        }
        fetchGames();
    }, [])

    function setGameName(name) {
        setShowName(name)
    }

    return (
        <div className="bg-light container col-11">
            <div className="border-bottom">
                <h2>Player Status - {showName}</h2>
                <ul className="list-inline text-center container col-12">
                    {
                        games.map((game, idx )=> (
                            <span key={game._id}>
                            <li className="list-inline-item col-3 m-0">
                                <Link to={"game/" + game._id} className="nav-link text-primary">{game.name}</Link>
                            </li>
                            { idx !== 2 && <span>|</span>}
                            </span>
                        ))
                    }
                </ul>
            </div>
            <Router>
                <GameStat path="game/:id" setName={setGameName} />
            </Router>
        </div>
    )
}

export default StatusComponent