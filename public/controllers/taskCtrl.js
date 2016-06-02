angular.module('taskCtrl', ['taskService'])

.controller('TaskController', function($rootScope, Task, $routeParams, $location, $window) {

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

        $rootScope.filterOptions = {
            statuses: [
                {id : 2, name : 'All', status: "all" },
                {id : 3, name : 'To Do', status: "to_do" },
                {id : 4, name : 'In Progress', status: "in_progress" },
                {id : 5, name : 'Verify', status: "verify" },
                {id : 6, name : 'Done', status: "done" }
            ]
        };

        $rootScope.filterOptions2 = {
            priorities: [
                {id : 2, name : 'All', priority: "all" },
                {id : 3, name : 'Blocker', priority: "Blocker" },
                {id : 4, name : 'Critical', priority: "Critical" },
                {id : 5, name : 'Major', priority: "Major" },
                {id : 6, name : 'Minor', priority: "Minor" },
                {id : 7, name : 'Trivial', priority: "Trivial" }
            ]
        };

        //Mapped to the model to filter
        $rootScope.filterItem = {
            status: $rootScope.filterOptions.statuses[0]
        };

        //Custom filter - filter based on the rating selected
        $rootScope.customFilter = function (data) {
            if (data.status === $rootScope.filterItem.status.status) {
                return true;
            } else if ($rootScope.filterItem.status.status === "all") {
                return true;
            } else {
                return false;
            }
        };

        $rootScope.filterItem2 = {
            priority: $rootScope.filterOptions2.priorities[0]
        };

        //Custom filter - filter based on the rating selected
        $rootScope.customFilter2 = function (data) {
            if (data.priority === $rootScope.filterItem2.priority.priority) {
                return true;
            } else if ($rootScope.filterItem2.priority.priority === "all") {
                return true;
            } else {
                return false;
            }
        };

    vm.changeStatus = function(value) {
            console.log(value);
        };

        Task.allTasks()
            .success(function (data) {
                vm.tasks = data;
                console.log(data);
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

        vm.removeTask = function (id) {
            Task.removeTask(id)
                .success(function (data) {

                    $window.location.reload();
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
        };

        vm.getTasksFromProject = function(id) {
            Task.getTasksFromProject(id)
                .success(function (data) {
                    vm.projectTasks = data;
                })
        }


    });