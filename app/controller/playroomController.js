app.controller('playroomController', function($scope, $location) {

    $scope.numAll = [];
    $scope.myTable = [];
    this.init = () => {
        let numAllLength = 75;
        for (let x = 1; x <= numAllLength; x++) {
            $scope.numAll.push(x)
        }
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

        var k = $scope.tablenum
        $scope.myTable = [
            [k[0], k[1], k[2], k[3], k[4]],
            [k[5], k[6], k[7], k[8], k[9]],
            [k[10], k[11], k[12], k[13], k[14]],
            [k[15], k[16], k[17], k[18], k[19]],
            [k[20], k[21], k[22], k[23], k[24]]
        ];
        // console.log("tablenum", $scope.tablenum);
        // console.log("myTable", $scope.myTable);
    }
    $scope.select = function() {

    }

});