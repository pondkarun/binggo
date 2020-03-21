app.service('playerService', function() {
    var data = JSON.parse(sessionStorage.getItem('player'));
    this.saveData = function(data) {
        sessionStorage.setItem("player", JSON.stringify({
            id_player: data.id_player,
            user: data.user
        }));
    };

    this.getUser = function() {
        return data.user;
    };

    this.getIdPlayer = function() {
        return data.id_player;
    };

})