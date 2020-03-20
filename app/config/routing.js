app.config(function ($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: webConfig.client + 'app/view/login.html',
            controller: 'loginController'
        })
        .when('/login', {
            templateUrl: webConfig.client + 'app/view/login.html',
            controller: 'loginController'
        })
        .when('/room', {
            templateUrl: webConfig.client + 'app/view/playroom.html',
            controller: 'roomController',
            resolve: {
                factory: checkPermisstion
            }
        })
        .when('/playroom', {
            templateUrl: webConfig.client + 'app/view/playroom.html',
            controller: 'playroomController',
              resolve: {
                  factory: checkPermisstion
            }
        })
      
        .otherwise({
            redirectTo: '/'
        });

});
var checkPermisstion = function ($q, $location, $timeout) {
    var per = sessionStorage.user;
    var deferred = $q.defer();
    if (per) {
        $timeout(function () {
            deferred.resolve(true);
        }, 2000);

    } else {
        deferred.reject();
        $location.path("/login");
    }
    return deferred.promise;
}