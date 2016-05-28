angular.module('projectCtrl', ['projectService'])

.controller('ProjectController', function($rootScope, Project) {

        var vm = this;

        Project.allProjects()
            .success(function (data) {
                vm.projects = data;
            });

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


    });