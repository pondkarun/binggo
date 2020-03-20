app.config(function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: './app/view/login.html',
            controller: 'loginController'
        })
        .when('/login', {
            templateUrl: './app/view/login.html',
            controller: 'loginController'
        })
        .when('/room', {
            templateUrl: './app/view/room.html',
            controller: 'roomController',
            resolve: {
                factory: checkPermisstion
            }
        })
        .when('/playroom', {
            templateUrl: './app/view/playroom.html',
            controller: 'playroomController',
            resolve: {
                factory: checkPermisstion
            }
        })

    .otherwise({
        redirectTo: '/'
    });

});
var checkPermisstion = function($q, $location, $timeout) {
    var per = sessionStorage.user;
    var deferred = $q.defer();
    if (per) {
        // $timeout(function() {
        //     deferred.resolve(true);
        // }, 2000);
        deferred.resolve(true);
    } else {
        deferred.reject();
        $location.path("/login");
    }
    return deferred.promise;
}