(function (){
    'use strict';
    
    angular
        .module('studentGradesApp')
        .controller('PaginationController', PaginationController);

    PaginationController.$inject = ['$scope', 'testService'];

    function PaginationController($scope, testService) {

        //Pagination init
        $scope.itemsPerPage = $scope.sql_limit;
        $scope.defaultPage = $scope.currentPage = 1;
        $scope.lastPage = 0;

        $scope.show = false;

        //Pass to scope some functions
        $scope.getTotalItems = getTotalItems;
        $scope.pageChanged = pageChanged;
        $scope.setPage = setPage;
        $scope.getPage = getPage;

        //When we get the totalItems value, display or not the pagination
        //In regard of the totalItems value
        $scope.$watch('totalItems', function(newValue, oldValue) {
            showPagination();
        });



        /* -------------- Pagination functions ------------------ */
        function getTotalItems() {
            return $scope.totalItems;
        }

        function showPagination() {

            var show = false;

            //show if enough items
            if ($scope.totalItems && $scope.sql_limit) {
                show = $scope.totalItems >  $scope.sql_limit;

                //A test has just been created/updated ?
                if ( $scope.$parent.$parent.testCreatedOrUpdated > $scope.$parent.$parent.NO_TEST_CREATED ) {

                    if ( $scope.$parent.testCreatedOrUpdated == $scope.TEST_UPDATED ) {
                        var sql_offset = $scope.$parent.$parent.sql_offset_current_list_tests;
                    } else {
                        var sql_offset = (Math.floor((testService.totalItems ) / $scope.itemsPerPage)) * $scope.itemsPerPage;
                    }
                    var pageToDisplay = (sql_offset / $scope.itemsPerPage) + 1;

                    $scope.setPage(pageToDisplay);

                    //Go back to normal
                    $scope.$parent.$parent.testCreatedOrUpdated = $scope.$parent.$parent.NO_TEST_CREATED;
                    
                } else {
                    $scope.setPage($scope.defaultPage);
                }
            } 
            $scope.show = show;
        }

        function pageChanged(type){ 

           $scope.$parent.sql_offset_current = $scope.itemsPerPage  * ($scope.currentPage - 1);

            switch(type) {
                case 'student':
                    $scope.loadStudentsData($scope.sql_limit, $scope.$parent.sql_offset_current);
                    break;
                case 'course':
                    $scope.loadCoursesData($scope.sql_limit, $scope.$parent.sql_offset_current);
                    break;
                case 'test':
                    $scope.$parent.$parent.sql_offset_current_list_tests = $scope.$parent.sql_offset_current;
                    $scope.loadTestsData($scope.sql_limit, $scope.$parent.sql_offset_current);
                default:
                    //do nothing
            } 
        }

        
        function setPage(pageNo) {
            $scope.currentPage = pageNo;
            //pass sql_offset to student/course controller
            $scope.$parent.sql_offset_current = ($scope.currentPage - 1) * $scope.itemsPerPage; 

        }

        function getPage() {
            return $scope.currentPage;
        }

          
    }

})();