app.service('playRoomService', function() {

    this.saveData = function(data) {
        sessionStorage.setItem("playRoom", JSON.stringify({
            id_par: data.id_par,
            number: data.number
        }));
    };

    this.SessionPlayRoom = function() {
        var data = JSON.parse(sessionStorage.getItem('playRoom'));
        return data;
    };



})