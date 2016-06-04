angular.module('appRoutes', ['ngRoute', 'authService'])

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
            .when('/create/:id', {
                templateUrl: 'views/pages/create_task.html',
                controller: 'TaskController',
                controllerAs: 'task'
            })
            .when('/new_project', {
                templateUrl: 'views/pages/new_project.html',
                controller: 'ProjectController',
                controllerAs: 'project'
            })
            .when('/add_user/:id', {
                templateUrl: 'views/pages/project_add_user.html',
                controller: 'ProjectController',
                controllerAs: 'project'
            })
            .when('/project/:id', {
                templateUrl: 'views/pages/project.html'
            })
            .when('/edit_task/:id', {
                templateUrl: 'views/pages/edit_task.html',
                controller: 'TaskController',
                controllerAs: 'task'
            })
            .when('/task/:id', {
                templateUrl: 'views/pages/task.html'
            })

        $locationProvider.html5Mode(true);

    })
    .run(function ($rootScope, $location, $http, Auth) {

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var restrictedPages = $.inArray($location.path(), ['/', '/signup']) === -1;
            var loggedIn = Auth.isLoggedIn();

            if(restrictedPages && !loggedIn)
                $location.path('/');
            
        });

    });