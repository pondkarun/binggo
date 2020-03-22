app.controller('roomController', function($scope, $location, $http, playerService, roomService) {
    _this = this;
    $scope.room = [];
    this.model = {
        id_room: null,
        id_player: null
    }

    this.init = function() {
        getRoom();
    }

    $scope.select = (id) => {
        // console.log("id", id);
        this.model = {
            id_room: id,
            id_player: playerService.getIdPlayer()
        }
        if (roomService.SessionRoom()) {
            if (roomService.SessionRoom().id_room == id) {
                goRoom()
            } else {
                saveRoom()
            }
        } else {
            saveRoom()
        }
    }


    const saveRoom = () => {
        loading.open();
        $http.post(webConfig.webApi + "playerAccRoom/addPlayerAccRoomService.php", this.model).then((res) => {
            // console.log("res.data", res.data);
            loading.close();
            if (res.data.status == "200") {
                roomService.saveData(res.data)
                goRoom()
            } else {
                alert("Error")
            }
        }).catch((err) => {
            alert("Error")
        })
    }

    const goRoom = () => {
        $location.path("/playroom");
    }

    const getRoom = () => {

        $http.get(webConfig.webApi + "room/getRoomService.php").then((res) => {
            $scope.room = res.data
        })

        setInterval(function() {
            $http.get(webConfig.webApi + "room/getRoomService.php").then((res) => {
                $scope.room = res.data
            })
        }, 1500);
    }
});