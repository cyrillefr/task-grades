(function (){
    'use strict';

     angular
        .module('studentGradesApp')
        .controller('TestController', TestController);

    TestController.$inject = ['$scope', '$routeParams', '$http', '$translate', 'courseService', 'studentService', 'testService', '$location', 'notificationsService'];


    function TestController($scope, $routeParams, $http, $translate, courseService, studentService, testService, $location, notificationsService) {


        //Init
        if ($routeParams.test_id && $routeParams.test_id > 0) {
            $scope.status='update';

            //existing test with fixed course
            testService.getTestDetails($routeParams.test_id).then(function () {
                $scope.testName = testService.testName;
                $scope.selectedCourse = testService.selectedCourse
                $scope.courseName = testService.courseName;
                $scope.testId = testService.testId;
                $translate('TEST_LABEL_UPDATE_THIS_TEST').then(function(translation){
                    $scope.titlePageTest = translation + ": " + testService.testName; 
                });
                loadStudentsGradesForTest($routeParams.test_id);

            });
        } else {
            $translate('TEST_LABEL_CREATE_NEW_TEST').then(function(translation){
                    $scope.titlePageTest = translation;
                });
            $scope.status='new';
            populateCourseSelect();
        }



        //Pass to scope some functions
        $scope.loadRegisteredStudents = function(){
             getCourseRegisteredStudents($scope.selectedCourse);
        };
        $scope.isNewTest = isNewTest;
        $scope.saveTest = saveTest;        
        $scope.cancelTest = cancelTest;


        /* -------------------------- Functions ------------------------------------ */
        function getCourseRegisteredStudents (course_id) {
            studentService.getStudentsByCourse(course_id).then(function() {
                $scope.studentList =  studentService.studentListByCourse.map(function(obj){
                    obj.grade = "";
                    return obj;
                });
            }); 
        };

        function isNewTest() {
            return $scope.status == 'new';
        };

        //populate html select of courses(new test)
        //10000 to bypass limit here cf. MySQL doc
        function populateCourseSelect() {
            
            return courseService.getCourses(10000, 0).then(function(data) {
                $scope.courses = courseService.courseList;
                $scope.totalItems = courseService.totalItems;
                $scope.selectedCourse = "0"; 
            });


        };

        function saveTest() {
            testService
                .createOrUpdateTest({
                    isNewTest: $scope.isNewTest(),
                    test_id: $scope.testId,
                    grades: $scope.studentList,
                    course_id: $scope.selectedCourse,
                    test_name: $scope.testName
                })
                .then(function() {
                    $location.path('/listTests').search({});
                });
        };


        function cancelTest() {
            $location.path('/listTests').search({});
        }


        function loadStudentsGradesForTest(testId) {
            return testService.getStudentsGradesForTest(testId).then(function () {
                $scope.studentList = testService.testGradesList;
            });

        }

       
    }//end controller

})();