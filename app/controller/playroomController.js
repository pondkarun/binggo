app.controller('playroomController', function($scope, $location, $http, roomService, playRoomService) {

    $scope.numAll = [];
    $scope.myTable = [];
    $scope.tablenum = [];
    this.init = () => {
        let maxLength = 75;
        for (let x = 1; x <= maxLength; x++) {
            $scope.numAll.push(x)
        }
        if (playRoomService.SessionPlayRoom()) {
            if (playRoomService.SessionPlayRoom().id_par == roomService.getId()) {
                setMyTable(playRoomService.SessionPlayRoom().number);
            }
        }
        getPlayer();
    }

    $scope.vote = function() {
        console.log("numAll", $scope.numAll);
    }

    $scope.random = function() {
        $scope.tablenum = [];
        $scope.myTable = [];
        var nums = angular.copy($scope.numAll);
        var i = nums.length;
        var j = 0;
        while (i--) {
            if ($scope.tablenum.length < 25) {
                j = Math.floor(Math.random() * (i + 1));
                $scope.tablenum.push(nums[j]);
                nums.splice(j, 1);
            } else {
                break;
            }
        }
        setMyTable($scope.tablenum);
        // console.log("tablenum", $scope.tablenum);
        // console.log("myTable", $scope.myTable);
    }

    $scope.select = () => {

        this.modelTable = {
            id_par: roomService.getId(),
            number: $scope.tablenum
        }

        if ($scope.tablenum.length > 0) {
            console.log("modelTable", this.modelTable);
            loading.open();
            $http.post(webConfig.webApi + "tableNumber/selectTableNumberService.php", this.modelTable).then((res) => {
                console.log("res.data", res.data);
                playRoomService.saveData(res.data)
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
            })
        } else {
            alert("New Random")
        }

    }

    const setMyTable = (k) => {
        $scope.myTable = [
            [k[0], k[1], k[2], k[3], k[4]],
            [k[5], k[6], k[7], k[8], k[9]],
            [k[10], k[11], k[12], k[13], k[14]],
            [k[15], k[16], k[17], k[18], k[19]],
            [k[20], k[21], k[22], k[23], k[24]]
        ];
    }

    const getPlayer = () => {
        let IdRoom = roomService.getIdRoom();
        $http.post(webConfig.webApi + "playerAccRoom/getPlayerAccRoomService.php", IdRoom).then((res) => {
            // console.log("res.data", res.data);
            $scope.player = res.data
        })
        setInterval(function() {
            $http.post(webConfig.webApi + "playerAccRoom/getPlayerAccRoomService.php", IdRoom).then((res) => {
                // console.log("res.data", res.data);
                $scope.player = res.data
            })
        }, 1500);
    }

});