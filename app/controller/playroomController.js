app.controller('playroomController', function($scope, $location) {

    $scope.tablenum = [];

    this.init = () => {}

    $scope.vote = function() {

    }
    $scope.random = function() {
        $scope.tablenum = [];
        var nums = []
        for (let x = 1; x < 100; x++) {
            nums.push(x)
        }
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
    }
    $scope.select = function() {

    }

});