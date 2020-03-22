app.service('playerService', function() {
    this.saveData = function(data) {
        sessionStorage.setItem("player", JSON.stringify({
            id_player: data.id_player,
            user: data.user
        }));
    };

    this.getUser = function() {
        var data = JSON.parse(sessionStorage.getItem('player'));
        return data.user;
    };

    this.getIdPlayer = function() {
        var data = JSON.parse(sessionStorage.getItem('player'));
        return data.id_player;
    };

})