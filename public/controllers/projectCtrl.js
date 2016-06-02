angular.module('projectCtrl', ['projectService'])

.controller('ProjectController', function($rootScope, Project, $routeParams, $window) {

        var vm = this;
        vm.projectId = $routeParams.id;

        Project.allProjects()
            .success(function (data) {
                vm.projects = data;
                console.log(data);
            });

        Project.allUsers()
            .success(function (data) {
                vm.users = data;
            })

        Project.usersOnProject(vm.projectId)
            .success(function (data) {
                vm.usersOnProject = data;
            })

        // List korisnika koji nisu na projektu
        Project.potentialUsers(vm.projectId)
            .success(function (data) {
                vm.potentialUsers = data;
            })

        vm.createProject = function () {
            vm.message = '';

            Project.create(vm.projectData)
                .success(function (data) {
                    vm.projectData = '';

                    vm.message = data.message;
                });
        };

        vm.getProjectAuthor = function(id) {
            Project.getProjectAuthor(id)
                .success(function (data) {
                    vm.ProjectAuthor = data;
                })
        }

        vm.addUser = function(userId, projectId) {

            Project.addUser(userId, projectId)
                .success(function(data) {
                    vm.addedUser = data;
                    $window.location.reload();
                })
        }

        vm.removeUser = function(userId, projectId) {

            Project.removeUser(userId, projectId)
                .success(function(data) {
                    vm.removedUser = data;
                    $window.location.reload();
                })
        }


    });