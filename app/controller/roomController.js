app.controller('roomController', function($scope, $location, $http) {
    _this = this;
    $scope.room = [];
    this.model = {
        id_room: null,
        id_player: null
    }

    this.init = function() {
        getRoom();
    }

    $scope.select = () => {
        if ($scope.roomForm.$valid) {
            console.log("this.model", this.model);

            // sessionStorage.room = $scope.model.room;
            // $location.path("/playroom");
        }
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