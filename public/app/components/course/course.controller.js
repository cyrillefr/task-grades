(function (){
    'use strict';

     angular
        .module('studentGradesApp')
        .controller('CourseController', CourseController);

    CourseController.$inject = ['$scope', '$http', 'courseService'];


    function CourseController($scope, $http, courseService) {

        //Init variables
        var sql_offset = $scope.$parent.sql_offset_default;

        //Initial load
        loadCoursesData($scope.sql_limit, sql_offset);

        //Pass to scope some functions
        $scope.loadCoursesData = loadCoursesData;


        /* -------------------------- Functions ------------------------------------ */
        function loadCoursesData (limit, offset) {
            return courseService.getCourses(limit, offset).then(function(data) {
                $scope.courseList = courseService.courseList;
                $scope.totalItems = courseService.totalItems;       
            });
        };


        $scope.deleteCourse = function (id) {
            if (confirm("Sure ?")) {
                courseService
                    .deleteCourse(id)
                    .then(function () {
                        $scope.loadCoursesData($scope.sql_limit, sql_offset); 
                    });
            }
        };

}

    //Cf. course-create-update-controller.js for create/update


})();