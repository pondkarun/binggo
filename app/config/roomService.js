app.service('roomService', function() {
    var data = JSON.parse(sessionStorage.getItem('room'));
    this.saveData = function(data) {
        sessionStorage.setItem("room", JSON.stringify({
            id: data.id,
            id_room: data.id_room
        }));
    };

    this.getId = function() {
        return data.id;
    };

    this.getIdRoom = function() {
        return data.id_room;
    };

})