angular.module('authCtrl', ['authService'])

.controller('AuthController', function($rootScope, $location, Auth, $window) {
        var vm = this;

        vm.loggedIn = Auth.isLoggedIn();
        $rootScope.isAdmin = false;

        $rootScope.$on('$routeChangeStart', function() {
            vm.loggedIn = Auth.isLoggedIn();

            Auth.getUser()
                .then(function(data) {
                    vm.user = data.data;
                    $rootScope.activeUser = data.data;

                    vm.getAdmin(vm.user._id);

                });

            var url = $location.path()

            if(url == '/' || url == '/signup')
                if(vm.loggedIn)
                    $location.path('/dashboard');

        });

        vm.doLogin = function() {
            vm.processing = true;
            $rootScope.isAdmin = false;

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
            $window.location.href = '/';
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
        };

        vm.getAdmin = function(id) {
            Auth.getUserById(id)
                .success(function (data) {
                    if(data.role == "admin") {
                        $rootScope.isAdmin = true;
                    }else {
                        $rootScope.isAdmin = false;
                    }
                })
        }

    });