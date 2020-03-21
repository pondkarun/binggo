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
        loading.open();
        $http.post(webConfig.webApi + "playerAccRoom/addPlayerAccRoomService.php", this.model).then((res) => {
            console.log("res.data", res.data);
            loading.close();
            if (res.data.status == "200") {
                roomService.saveData(res.data)
                $location.path("/playroom");
            } else {
                alert("Error")
            }
        }).catch((err) => {
            alert("Error")
        })
    }

    const getRoom = () => {
        loading.open();
        $http.get(webConfig.webApi + "room/getRoomService.php").then((res) => {
            // console.log("res.data", res.data);
            $scope.room = res.data
            loading.close();
        }).catch((err) => {
            console.log("Error");
            loading.close();
        })
    }
});