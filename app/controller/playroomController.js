app.controller('playroomController', function($scope, $location, $http, roomService, playRoomService, playerService) {

    $scope.numAll = [];
    $scope.myTable = [];
    $scope.tablenum = [];
    $scope.model = {
        id_room: roomService.getIdRoom(),
        id_player: playerService.getIdPlayer(),
        readyOrNot: null,
        status: null
    };

    this.init = () => {
        let maxLength = 75;
        for (let x = 1; x <= maxLength; x++) {
            $scope.numAll.push(x)
        }
        if (playRoomService.SessionPlayRoom()) {
            if (playRoomService.SessionPlayRoom().id_par == roomService.getId()) {
                setMyTable(playRoomService.SessionPlayRoom().number);
                $scope.tablenum = playRoomService.SessionPlayRoom().number
            }
        }
        getPlayer();
        getMe();
        tableBingo();
    }

    $scope.vote = function() {

        $scope.model.readyOrNot = !$scope.model.readyOrNot
        $scope.model.status = ($scope.model.readyOrNot == true) ? "true" : "false";
        if ($scope.model.readyOrNot) {
            $scope.voteReady = `Ready`;
        } else {
            $scope.voteReady = `Not Ready`
        };
        $http.post(webConfig.webApi + "playerAccRoom/readyOrNotService.php", $scope.model).then((res) => {
            console.log("res.data", res.data);
        });
        // console.log("numAll", $scope.numAll);
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
            [{ index: 0, is_find: false, number: k[0] }, { index: 1, is_find: false, number: k[1] }, { index: 2, is_find: false, number: k[2] }, { index: 3, is_find: false, number: k[3] }, { index: 4, is_find: false, number: k[4] }],
            [{ index: 5, is_find: false, number: k[5] }, { index: 6, is_find: false, number: k[6] }, { index: 7, is_find: false, number: k[7] }, { index: 8, is_find: false, number: k[8] }, { index: 9, is_find: false, number: k[9] }],
            [{ index: 10, is_find: false, number: k[10] }, { index: 11, is_find: false, number: k[11] }, { index: 12, is_find: false, number: k[12] }, { index: 13, is_find: false, number: k[13] }, { index: 14, is_find: false, number: k[14] }],
            [{ index: 15, is_find: false, number: k[15] }, { index: 16, is_find: false, number: k[16] }, { index: 17, is_find: false, number: k[17] }, { index: 18, is_find: false, number: k[18] }, { index: 19, is_find: false, number: k[19] }],
            [{ index: 20, is_find: false, number: k[20] }, { index: 21, is_find: false, number: k[21] }, { index: 22, is_find: false, number: k[22] }, { index: 23, is_find: false, number: k[23] }, { index: 24, is_find: false, number: k[24] }],
        ];
    }

    const tableBingo = () => {
        let random = [24, 5, 9, 56, 78, 66, 33, 41, 30, 4]
        let positionIndex = []
        random.forEach(e => {
            let where = $scope.tablenum.indexOf(e)
            if (where != -1) {
                positionIndex.push(where)
            }
        });

        $scope.myTable.forEach(e => {
            positionIndex.forEach(i => {
                var filteredObj = e.find(x => x.index == i)
                if (filteredObj) {
                    filteredObj.is_find = true
                }
            })
        })

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
        }, 1960);
    }

    const getMe = () => {
        $http.post(webConfig.webApi + "playerAccRoom/getMePARService.php", $scope.model).then((res) => {
            // console.log("res.data", res.data);
            $scope.model.status = res.data.status;
            $scope.model.readyOrNot = (res.data.status == "true") ? true : false;
            if ($scope.model.readyOrNot) {
                $scope.voteReady = `Ready`
            } else {
                $scope.voteReady = `Not Ready`
            };
        });
        // setInterval(function() {

        //     $http.post(webConfig.webApi + "playerAccRoom/getMePARService.php", $scope.model).then((res) => {
        //         // console.log("res.data", res.data);
        //         $scope.model.status = res.data.status;
        //         $scope.model.readyOrNot = (res.data.status == "true") ? true : false;
        //         if ($scope.model.readyOrNot) {
        //             $scope.voteReady = `Ready`
        //         } else {
        //             $scope.voteReady = `Not Ready`
        //         };
        //     });
        // }, 3000);
    }

});