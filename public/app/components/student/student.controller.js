(function (){
    'use strict';

     angular
        .module('studentGradesApp')
        .controller('StudentController', StudentController);

    StudentController.$inject = ['$scope', '$http', 'studentService'];


    function StudentController($scope, $http, studentService) {

        //Init variables
        $scope.sql_offset = $scope.$parent.sql_offset_default;

        //Initial load
        loadStudentsData($scope.sql_limit, $scope.sql_offset);

        //Pass to scope some functions
        $scope.loadStudentsData = loadStudentsData;
        $scope.deleteStudent = deleteStudent;


        /* -------------------------- Functions ------------------------------------ */
        function loadStudentsData (limit, offset) {
            return studentService.getStudentsList(limit, offset).then(function () {
                $scope.studentList = studentService.studentList;
                $scope.totalItems = studentService.totalItems;
            });
        };

        function deleteStudent (id) {
            if (confirm("Sure ?")) {
                studentService
                    .deleteStudent(id)
                    .then(function () {
                        $scope.loadStudentsData($scope.sql_limit, $scope.sql_offset);
                    });
            }
        };

    }

    //Cf. student-create-update-controller.js for create/update
    


})();