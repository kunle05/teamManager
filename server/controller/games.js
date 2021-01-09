const mongoose = require("mongoose");
const Game = mongoose.model("Game")
const Player = mongoose.model("Player")


module.exports = {
    createNewGame: async (req, res) => {
        //I used async await here and promise in players
        const players =  await Player.find({});
        if(players) {
            const game = new Game(req.body);
            players.forEach(player => {
                let playerGameStat = {
                    player: player,
                    status: 0
                }
                game.players.push(playerGameStat)
            }) 
            let newGame = await game.save()
            if(newGame) {
                res.json(newGame)
            } else {
                res.json({message: "something went wrong"})
            }
        }
    },
    getGameStats: (req, res) => {
        Game.findById(req.params.id)
        .then(gameStat => res.json(gameStat))
        .catch(err => res.json(err))
    },
    updatePlayerGameStat: (req, res) => {
        let playerId = req.params.playerId
        let statId = req.params.statId
        Game.findById(req.params.gameId)
        .then(game => {
            for(player of game.players) {
                if(player.player._id == playerId) {
                    player.status = statId
                    game.save()
                    .then(updatedGame => res.json(updatedGame))
                    .catch(err => res.json(err))
                    break
                }
            }
        })
    },
    getAllGames: (req, res) => {
        Game.find({})
        .then(games => res.json(games))
        .catch(err => res.json(err))
    }
}