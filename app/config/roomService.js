app.service('roomService', function() {

    this.saveData = function(data) {
        sessionStorage.setItem("room", JSON.stringify({
            id: data.id,
            id_room: data.id_room
        }));
    };

    this.SessionRoom = function() {
        var data = JSON.parse(sessionStorage.getItem('room'));
        return data;
    };

    this.getId = function() {
        var data = JSON.parse(sessionStorage.getItem('room'));
        return data.id;
    };

    this.getIdRoom = function() {
        var data = JSON.parse(sessionStorage.getItem('room'));
        return data.id_room;
    };

})