angular.module('authCtrl', ['authService'])

.controller('AuthController', function($rootScope, $location, Auth) {
        var vm = this;

        vm.loggedIn = Auth.isLoggedIn();
        vm.isAdmin = false;

        $rootScope.$on('$routeChangeStart', function() {
            vm.loggedIn = Auth.isLoggedIn();

            Auth.getUser()
                .then(function(data) {
                    vm.user = data.data;

                    vm.getAdmin(vm.user._id);

                });
        });

        vm.doLogin = function() {
            vm.processing = true;

            vm.error = '';

            Auth.login(vm.loginData.username, vm.loginData.password)
                .success(function (data) {
                    vm.processing = false;
                    Auth.getUser()
                        .then(function(data) {
                            vm.user = data.data;
                        });

                    

                    if(data.success) {

                        $location.path('/dashboard');
                    }
                    else
                        vm.error = data.message;
                })



            
        };

        vm.doLogout = function() {
            Auth.logout();
            $location.path('/');
        };

        vm.getActiveUser = function () {
            Auth.getUser()
                .then(function(data) {
                    vm.user = data.data;
                });
        };

        vm.getUserById = function(id) {
            Auth.getUserById(id)
                .success(function (data) {
                    vm.otherUser = data;
                })
        }

        vm.getAdmin = function(id) {
            Auth.getUserById(id)
                .success(function (data) {
                    if(data.role == "admin") {
                        vm.isAdmin = true;
                    }
                })
        }

    });