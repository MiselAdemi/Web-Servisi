angular.module('projectCtrl', ['projectService'])

.controller('ProjectController', function($rootScope, Project, $routeParams) {

        var vm = this;
        vm.projectId = $routeParams.id;

        Project.allProjects()
            .success(function (data) {
                vm.projects = data;
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
                console.log(data);
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
                })
        }


    });