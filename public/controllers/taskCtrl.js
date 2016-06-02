angular.module('taskCtrl', ['taskService'])

.controller('TaskController', function($rootScope, Task, $routeParams, $location) {

        var vm = this;
        vm.IdToAddTask = $routeParams.id;
        vm.taskTo = [];

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
                    $location.path('/dashboard');
                });
        };

        vm.getTaskAuthor = function(id) {
            Task.getTaskAuthor(id)
                .success(function (data) {
                    vm.taskAuthor = data;
                })
        };

        vm.getTaskTo = function(id) {
            Task.getTaskTo(id)
                .success(function (data) {
                    vm.taskTo.push(data);
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