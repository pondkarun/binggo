app.controller('loginController', function($scope, $location, $http, playerService) {

    $scope.send = () => {
        if ($scope.loginForm.$valid) {
            loading.open();
            $http.post(webConfig.webApi + "login/loginService.php", this.model).then((res) => {
                // console.log("res.data", res.data);
                loading.close();
                if (res.data.status == "200") {
                    this.model.id_player = res.data.id_player
                    playerService.saveData(this.model)
                    $location.path("/room");
                } else {
                    alert("Error")
                }
            }).catch((err) => {
                alert("Error")
            })
        }
    }

});