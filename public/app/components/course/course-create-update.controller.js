(function (){
    'use strict';

     angular
        .module('studentGradesApp')
        .controller('PopUpCreateUpdateCourseController', PopUpCreateUpdateCourseController)
        .controller('ModalCreateUpdateCourseController', ModalCreateUpdateCourseController);

    PopUpCreateUpdateCourseController.$inject = ['$scope', '$uibModal', '$http', 'courseService', 'notificationsService', '$translate', '$timeout'];
    ModalCreateUpdateCourseController.$inject  = ['$scope', '$uibModalInstance', 'course', '$translate'];




    function PopUpCreateUpdateCourseController($scope, $uibModal, $http, courseService, notificationsService, $translate, $timeout) {

        $scope.updateOrCreateCourse = function (size) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/app/components/course/modalCreateUpdateCourseContent.html',
                controller: 'ModalCreateUpdateCourseController',
                size: size,
                resolve: {
                    course: function () {
                        if($scope.course){
                            $scope.course.toBeUpdated = true;
                        }
                        return $scope.course;
                    }
                }
        });

        modalInstance.result.then(
            //'Ok' button
            function (course) {

                if (typeof course == 'undefined'){
                    $translate('GENERAL_MESSAGE_EMPTY_FORM').then(function(translation){
                        notificationsService.sendEventFailed(translation);
                    });
                    return;
                }

                 courseService
                    .createOrUpdateCourse(course)
                    .then(function () {
                        var itemsPerPage = $scope.$parent.sql_limit;

                        //select correct page number
                        if(course.toBeUpdated) {
                            var sql_offset = $scope.sql_offset;
                        } else {
                            var sql_offset = (Math.floor((courseService.totalItems ) / itemsPerPage)) * itemsPerPage;
                        }

                        //var sql_offset = (Math.floor((courseService.totalItems ) / itemsPerPage)) * itemsPerPage;


                        var nextPage = Math.ceil((courseService.totalItems + 1) / itemsPerPage);
                        
                        $scope.loadCoursesData($scope.sql_limit, sql_offset)
                            .then($timeout($scope.setPage, 10, true, nextPage));
                    });
            }, 
            //'Cancel' have been clicked
            function (course) {});
        };
    }


    function ModalCreateUpdateCourseController($scope, $uibModalInstance, course, $translate) {
        if(course){
            $scope.course = course;
            var unLocalizedTitle = 'COURSE_LABEL_UPDATE_COURSE';
        } else {
            var unLocalizedTitle = 'COURSE_LABEL_ADD_COURSE';
        }

        $translate(unLocalizedTitle).then(function(translation){
            $scope.title = translation;
        });
            

        $scope.ok = function () {
            $uibModalInstance.close($scope.course);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        
} 


})();