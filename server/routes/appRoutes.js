const Games = require("../controller/games");
const Players = require("../controller/players");

module.exports = app => {
    app.post("/newGame", Games.createNewGame);  //tested
    app.get("/gameStat/:id", Games.getGameStats); //tested
    app.get("/game/:gameId/:playerId/:statId", Games.updatePlayerGameStat); //tested
    app.get("/games", Games.getAllGames);
    app.post("/newPlayer", Players.addNewPlayer);  //tested
    app.get("/allPlayers", Players.getAllPlayers); //tested
    app.delete("/player/:id", Players.removePlayer); //tested
}