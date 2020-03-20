app.controller('loginController', function ($scope, $location) {

    $scope.send = function () {
        sessionStorage.user = $scope.model.user;
        $location.path("/room");
    }

});