const mongoose = require("mongoose");
const Player = mongoose.model("Player")
const Game = mongoose.model("Game")

module.exports = {
    addNewPlayer: (req, res) => {
        Player.create(req.body)          //I used promise here and async await in games
        .then(player => {
            Game.find({})
            .then(games => {
                games.forEach(game => {
                    game.players.push({
                        player: player,
                        status: 0
                    });
                    game.save()
                });
            })
            res.json(player)
        })
        .catch(err => res.json(err))
    },
    getAllPlayers: (req, res) => {
        Player.find({})
        .then(players => res.json(players))
        .catch(err => res.json(err))
    },
    removePlayer: async (req, res) => {   //async here
        let player = await Player.findById(req.params.id)
        if(player) {
            let games = await Game.find({})
            if(games) {
                games.forEach(game => {
                    let newPlayerList = game.players.filter(gamePlayer => {
                        return gamePlayer.player._id != req.params.id  //for some reasons player._id from line 31 does not work here
                    })
                    game.players = newPlayerList
                    game.save()
                })
            } 
            let result = await Player.deleteOne(player)
            res.json(result)
        } else {
            res.json({message: "Player not found"})
        }
    }
}