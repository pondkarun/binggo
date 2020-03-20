app.controller('roomController', function ($scope, $location) {
    $scope.room = [];

    $scope.select = function () {
        sessionStorage.room = $scope.model.room;
        $location.path("/playroom");
    }

});