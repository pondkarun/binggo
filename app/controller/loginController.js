app.controller('loginController', function($scope, $location, $http) {

    $scope.send = () => {
        if ($scope.loginForm.$valid) {
            sessionStorage.user = this.model.user;
            loading.open();
            $http.post(webConfig.webApi + "login/loginService.php", this.model).then((res) => {
                // console.log("res.data", res.data);
                loading.close();
                if (res.data == "200") {
                    $location.path("/room");
                } else {
                    alert("Error")
                }
            }).catch((err) => {
                $scope.model.PASSWORD = null
            })
        }
    }

});