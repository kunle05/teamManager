import React, { useEffect, useState } from "react";
import axios from "axios";

const PlayerList = () => {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let result = await axios.get("http://localhost:8200/allPlayers")
            setPlayers(result.data)
        }
        fetchData();
    }, [])

    const deletePlayer = async (e, id) => {
        await axios.delete("http://localhost:8200/player/" + id)
        let newPlayerArray = players.filter(player => player._id !== id)
        setPlayers(newPlayerArray);
    }

    if(players.length === 0) {
        return(
            <div className="container p-5">
                <div className="bg-secondary text-warning container col-6 p-3 text-center">
                    <h2>Add players to your team</h2>
                </div>
            </div>
        )
    }
    return (
        <div className="p-3 container col-9 mb-5">
            <table className="table table-striped">
                <thead className="bg-info">
                    <tr>
                        <th><h5 className="m-0">Player Name</h5></th>
                        <th><h5 className="m-0">Preferred Position</h5></th>
                        <th><h5 className="m-0">Actions</h5></th>
                    </tr>
                </thead>
                <tbody>
                    { players.map(player => (
                        <tr key={player._id} >
                            <td>{ player.name }</td>
                            <td>{ player.position !== "" ? player.position : <em className="text-muted">unspecified</em>  }</td>
                            <td><button onClick={ e => deletePlayer(e, player._id) } className="btn btn-danger py-1">DELETE</button></td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}

export default PlayerList