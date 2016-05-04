(function (){
    'use strict';

     angular
        .module('studentGradesApp')
        .controller('ListTestsController', ListTestsController);

    ListTestsController.$inject = ['$scope', 'testService', '$location', 'notificationsService'];


    function ListTestsController($scope, testService, $location, notificationsService) {

        //Init variables
        $scope.sql_offset = $scope.$parent.sql_offset_default;

        //Initial load
        loadTestsData($scope.sql_limit, $scope.sql_offset);


        //Pass to scope some functions
        $scope.loadTestsData = loadTestsData;
        $scope.openTestForm = openTestForm;
        $scope.deleteTest = deleteTest;

        /* -------------------------- Functions ------------------------------------ */
        function loadTestsData (limit, offset) {
            testService.getTestList(limit, offset).then(function() {
                $scope.testList =  testService.testList;
                $scope.totalItems = testService.totalItems;
            });
        }

        function openTestForm(test) {
            if(test){
                $location.path('/test').search({test_id: test.id, course_id: test.course_id});    
            } else {
                $location.path('/test');
            }
        }


        function deleteTest(testId) {
             if (confirm("Sure ?")) {
                testService
                    .deleteTest(testId)
                    .then(function () {
                        loadTestsData($scope.sql_limit, $scope.sql_offset);
                    });
            }
        }


    }

})();