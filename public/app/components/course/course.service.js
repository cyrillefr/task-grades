(function (){
    'use strict';

    angular
        .module('studentGradesApp')
        .factory('courseService', courseService);

    courseService.$inject = ['$http', 'notificationsService'];

    function courseService($http, notificationsService) {


        var courseService = {
            getCourses: getCourses,
            getCourseDetailStudent: getCourseDetailStudent,
            deleteCourse: deleteCourse,
            createOrUpdateCourse: createOrUpdateCourse
        };

        return courseService;

        //Functions ---------------------------------------
        function getCourses(limit, offset){
            return $http.get('/api/courses/list/' + limit + '/' + offset)
                .then(getCoursesListComplete)
                .catch(operationFailed);

                function getCoursesListComplete(response) {
                    courseService.courseList = response.data.records || [];
                    courseService.totalItems = response.data.count || 0;
            }
            
        }

        function getCourseDetailStudent(studentId){
            return $http.get('/api/student/student_detail/student/' + studentId)
                .then(getCourseDetailStudentComplete)
                .catch(operationFailed);

                function getCourseDetailStudentComplete(response) {
                    courseService.existingCourses = response.data || [];
                }


        }

        function deleteCourse(id) {
            return $http.delete("/api/course/delete/" + id)
                .then(operationComplete)
                .catch(operationFailed);
        }

        function createOrUpdateCourse(course) {
            var url, method;
            var data = {number: course.number, name: course.name};

            //Config Ajax call
            if (course.toBeUpdated) {
                url = '/api/course/update';
                method = 'PUT';
                data['id'] = course.id;
            } else {
                url = '/api/course/create';
                method = 'POST';
            }

            var req = {
                method: method,
                url: url,
                data:  data
            };

            return $http(req)
                .then(operationComplete)
                .catch(operationFailed);


        }


        function operationFailed(response) {
             if(response && response.data && response.data.errors){
                notificationsService.sendEventFailed(response.data.errors);
            } else {
                notificationsService.sendEventFailed("Unknown server error.");
            }
        }

        function operationComplete(response) {
            notificationsService.sendEventEmptyNotifications();
        }

    }

})();