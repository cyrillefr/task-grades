(function (){
    'use strict';

     angular
        .module('studentGradesApp')
        .controller('PopUpCreateUpdateStudentController', PopUpCreateUpdateStudentController)
        .controller('ModalCreateUpdateStudentController', ModalCreateUpdateStudentController);

    PopUpCreateUpdateStudentController.$inject = ['$scope', '$uibModal', '$http', 'studentService', 'notificationsService', '$translate', '$timeout'];
    ModalCreateUpdateStudentController.$inject = ['$scope', '$uibModalInstance', 'student', 'courseService', '$translate'];




function PopUpCreateUpdateStudentController($scope, $uibModal, $http, studentService, notificationsService, $translate, $timeout) {
        $scope.updateOrCreateStudent = function (size) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/app/components/student/modalCreateUpdateStudentContent.html',
                controller: 'ModalCreateUpdateStudentController',
                size: size,
                resolve: {
                    student: function () {
                        if($scope.student)
                            $scope.student.toBeUpdated = true;
                        if ($scope.student && $scope.student.first_name)
                            $scope.student.firstName = $scope.student.first_name;
                        if ($scope.student && $scope.student.last_name)
                            $scope.student.lastName = $scope.student.last_name;

                        return $scope.student;
                    }
                }
        });

        modalInstance.result.then(
            //Clicked 'ok'
            function (detailsStudent) {

                //No field is filled, raise no error back side, handle it here
                if (typeof detailsStudent.student === 'undefined'){
                    $translate('GENERAL_MESSAGE_EMPTY_FORM').then(function(translation){
                         notificationsService.sendEventFailed(translation);
                    });
                    return;
                }
                 studentService
                    .createOrUpdateStudent(detailsStudent)
                    .then(function () {
                        var itemsPerPage = $scope.$parent.sql_limit;

                        //select correct page number
                        if(detailsStudent.student.id === undefined) {
                            var sql_offset = (Math.floor((studentService.totalItems ) / itemsPerPage)) * itemsPerPage;
                        } else {
                            var sql_offset = $scope.sql_offset_current;
                        }

                        var nextPage = Math.ceil((studentService.totalItems + 1) / itemsPerPage);
                        $scope.loadStudentsData($scope.sql_limit, sql_offset)
                            .then($timeout($scope.setPage, 10, true, nextPage));
                    });

            }, 
            //Clicked 'Cancel'
            function () {});
        };
    }

    //On opening modal window that displays student detail
    function ModalCreateUpdateStudentController($scope, $uibModalInstance, student, courseService, $translate) {


        if(student){
            $scope.student = student;
            var studentId = student.id;
            var unLocalizedTitle = 'STUDENT_LABEL_UPDATE_STUDENT';
        } else {
            var studentId = 0;
            $scope.status = 'new';
            var unLocalizedTitle = 'STUDENT_LABEL_ADD_STUDENT';
        }


        $translate(unLocalizedTitle).then(function(translation){
            $scope.title = translation;
        });
        

        //populates the 'Available courses' & 'Registered for' selects, filter apply in the view
        courseService.getCourseDetailStudent(studentId).then(function() {
                $scope.existingCourses = courseService.existingCourses;
        })


        //loop over the courses, switch from 'N' to 'Y' for targeted id(s)
        $scope.takeCourse = function(){
            $scope.existingCourses.map(function (objCourse) {
                if (objCourse.take_course && objCourse.take_course == 'N' &&  ($scope.not_registered_courses.indexOf(objCourse.id.toString()) != -1) ) {
                    objCourse.take_course = 'Y';
                }
            });
        };


        $scope.leaveCourse = function() {
            $scope.existingCourses.map(function (objCourse) {
                if (objCourse.take_course && objCourse.take_course == 'Y' &&  ($scope.registered_courses.indexOf(objCourse.id.toString()) != -1) ) {
                    objCourse.take_course = 'N';
                }
            });
        };


        $scope.ok = function () {

            //filters existingCourses to rule out non registered courses
            var existingCourses = $scope.existingCourses;
            var courses = [];
            existingCourses.map(function(course){
                if(course['take_course'] == 'Y'){
                    courses.unshift({id: course['id'], number: course['number'], name: course['name']});
                }
            });

            $uibModalInstance.close({student: $scope.student, courses: courses});
        };


        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }  



})();