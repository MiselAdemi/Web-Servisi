angular.module('appRoutes', ['ngRoute'])

.config(function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/pages/login.html',
                controller: 'AuthController',
                controllerAs: 'auth'
            })
            .when('/dashboard', {
                templateUrl: 'views/pages/dashboard.html'
            })
            .when('/signup', {
                templateUrl: 'views/pages/signup.html'
            })
            .when('/create', {
                templateUrl: 'views/pages/create_task.html',
                controller: 'TaskController',
                controllerAs: 'task'
            })

        $locationProvider.html5Mode(true);

    });