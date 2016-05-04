(function (){
    'use strict';

    angular
        .module('studentGradesApp')
        .factory('studentService', studentService);

    studentService.$inject = ['$http', 'notificationsService'];        


    function studentService($http, notificationsService) {

        //Exposed functions
        var studentService = {
            getStudentsList: getStudentsList,
            getStudentsByCourse: getStudentsByCourse,
            deleteStudent: deleteStudent,
            createOrUpdateStudent: createOrUpdateStudent
        };

        return studentService;

        // -------------------------- Functions ------------------------------------
        function getStudentsList(limit, offset) {
            return $http.get('/api/students/list/' + limit + '/' + offset)
                .then(getStudentsListComplete)
                .catch(operationFailed);

            function getStudentsListComplete(response) {
                studentService.studentList = response.data.records || [];
                studentService.totalItems = response.data.count || 0;
            }

        }

        function getStudentsByCourse(courseId){
            return $http.get('/api/students_by_course/course/' + courseId)
                .then(getStudentsByCourseComplete)
                .catch(operationFailed);

                function getStudentsByCourseComplete(response) {
                    studentService.studentListByCourse = response.data || [];
                }
        }


        function deleteStudent(studentId){
            return $http.delete('/api/student/delete/' + studentId)
                .then(operationComplete)
                .catch(operationFailed);
        }


        function createOrUpdateStudent(detailsStudent) {

            var url, method;
            var data = {
                first_name: detailsStudent.student.firstName, 
                last_name: detailsStudent.student.lastName, 
                courses: detailsStudent.courses
            };

            //Config Ajax call
            if(detailsStudent.student.id === undefined) {
                url = '/api/student/create';
                method = 'POST';
            } else {
                url = '/api/student/update';
                method = 'PUT';
                data['id'] = detailsStudent.student.id;
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
            //cf. in controller
        }


    }

})();