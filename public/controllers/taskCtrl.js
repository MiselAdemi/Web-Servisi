angular.module('taskCtrl', ['taskService'])

.controller('TaskController', function($rootScope, Task, $routeParams) {

        var vm = this;
        vm.IdToAddTask = $routeParams.id;

        $rootScope.priority = [
            'Blocker',
            'Critical',
            'Major',
            'Minor',
            'Trivial'
        ];

        Task.allTasks()
            .success(function (data) {
                vm.tasks = data;
            });

        vm.createTask = function () {
            vm.message = '';

            Task.create(vm.taskData)
                .success(function (data) {
                    vm.taskData = '';

                    vm.message = data.message;
                });
        };

        vm.getTaskAuthor = function(id) {
            Task.getTaskAuthor(id)
                .success(function (data) {
                    vm.taskAuthor = data;
                })
        };

        //Nije task nego project
        vm.getProjectById = function(id) {
            Task.getProjectById(id)
                .success(function (data) {
                    vm.currentProject = data;
                })
        }


    });