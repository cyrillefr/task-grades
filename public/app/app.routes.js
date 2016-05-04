(function (){
    'use strict';

    angular
        .module('studentGradesApp')
        .config(routerConfig);

    routerConfig.$inject = ['$routeProvider'];

    function routerConfig($routeProvider){
        $routeProvider
            .when('/listStudents', {
                templateUrl: '/app/components/student/listStudentsView.html',
                controller: 'StudentController'
            }).
             when('/listCourses', {
                templateUrl: '/app/components/course/listCoursesView.html',
                controller: 'CourseController'
            }).
            when('/listTests', {
                templateUrl: '/app/components/test/listTestsView.html',
                controller: 'ListTestsController'
            }).
            when('/test', {
                templateUrl: '/app/components/test/testView.html',
                controller: 'TestController'
            }).
            otherwise({
                   redirectTo: '/listStudents'
                });
    }

})();
