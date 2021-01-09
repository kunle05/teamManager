import React, { useEffect, useState } from "react"
import axios from "axios"

const GameStat = props => {
    const [game, setGame] = useState(0);

    useEffect(() => {
        async function getGameStat(id) {
            let result = await axios.get("http://localhost:8200/gameStat/" + id )
            setGame(result.data)
            props.setName(result.data.name)
        }
        getGameStat(props.id);
    }, [props])

    const updateStatus = async (e, playerId, num) => {
        let result = await axios.get(`http://localhost:8200/game/${props.id}/${playerId}/${num}`)
        setGame(result.data);
    }
    
    return (
        <div className="container col-10 pb-3">
        <table className="table table-striped table-bordered my-5">
            <thead>
                <tr className="bg-info"> 
                    <th colSpan="2" className="text-center"><h4>{game.name}</h4></th>
                </tr>
                <tr className="bg-secondary text-light">
                    <th style={{width: "30%"}}><h5 className="m-0">Player Name</h5></th>
                    <th className="text-center"><h5 className="m-0">Status</h5></th>
                </tr>
            </thead>
            <tbody>
                { game ? game.players.map(player => {
                    let playerId = player.player._id
                    return (
                        <tr key={player._id}>
                            <td className="font-weight-bold">{player.player.name}</td>
                            <td className="text-center">
                                <button onClick={ e => updateStatus(e, playerId, 2) } className={player.status === 2 ? "btn btn-success mx-3 col-3" : "btn btn-secondary mx-3 col-3"}>Playing</button> 
                                <button onClick={ e => updateStatus(e, playerId, 1) } className={player.status === 1 ? "btn btn-danger mx-3 col-3" : "btn btn-secondary mx-3 col-3"}>Not Playing</button>
                                <button onClick={ e => updateStatus(e, playerId, 0) } className={player.status === 0 ? "btn btn-warning mx-3 col-3" : "btn btn-secondary mx-3 col-3"}>Undecided</button>
                            </td>
                        </tr>
                    )
                }) : <tr></tr>}
            </tbody>
        </table>
        </div>
    )
}

export default GameStat