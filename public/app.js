var app = angular.module('myApp', ['appRoutes', 'authCtrl', 'authService', 'userService', 'userCtrl', 'taskCtrl', 'taskService'])

.config(function ($httpProvider) {

        $httpProvider.interceptors.push('AuthInterceptor');

    });

app.directive('newtask', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/elements/new_task.html'
        };
    });