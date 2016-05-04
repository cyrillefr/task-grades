(function (){
    'use strict';

    angular
        .module('studentGradesApp')
        .factory('testService', testService);

    testService.$inject = ['$http', 'notificationsService'];        


    function testService($http,notificationsService) {


        var testService = {
            getTestList: getTestList,
            getTestDetails: getTestDetails,
            createOrUpdateTest: createOrUpdateTest,
            deleteTest: deleteTest,
            getStudentsGradesForTest: getStudentsGradesForTest
        };

        return testService;

        //Functions ---------------
        function getTestList(limit, offset) {
            return $http.get('/api/tests/list/' + limit + '/' + offset)
                .then(getTestListComplete)
                .catch(operationFailed);


            function getTestListComplete(response) {
                testService.testList = response.data.records || [];
                testService.totalItems = response.data.count || 0;
            }
        }

        function getTestDetails(test_id) {
            return $http.get('/api/test/' + test_id)
                .then(getTestDetailsComplete)
                .catch(operationFailed);

            function getTestDetailsComplete(response) {
                testService.testName = response.data.test_detail.test_name;
                testService.selectedCourse = response.data.test_detail.course_id;
                testService.courseName = response.data.test_detail.course_name;
                testService.testId = response.data.test_detail.test_id;
            }
        }

        function getStudentsGradesForTest(test_id) {
            return $http.get('/api/test/grades/' + test_id)
                .then(getStudentsGradesForTestComplete)
                .catch(operationFailed);

             function getStudentsGradesForTestComplete(response) {
                testService.testGradesList = response.data.records || [];
            }
        }

        function createOrUpdateTest(testData) {

            //Config Ajax call
            var url = '/api/test/create';
            var method = 'POST';
            var data = {grades: testData.grades, course_id: testData.course_id, test_name: testData.test_name};
            if (testData.isNewTest === false) {
                url = '/api/test/update';
                method = 'PUT';
                data.test_id = testData.test_id;
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


        function deleteTest(testId) {
            return $http.delete('/api/test/delete/' + testId)
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