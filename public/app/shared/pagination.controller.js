(function (){
    'use strict';
    
    angular
        .module('studentGradesApp')
        .controller('PaginationController', PaginationController);

    PaginationController.$inject = ['$scope'];

    function PaginationController($scope) {

        //Pagination init
        $scope.itemsPerPage = $scope.sql_limit;
        $scope.defaultPage = 1;
        $scope.lastPage = 0;


        /* -------------- Pagination functions ------------------ */
        $scope.getTotalItems = function() {
            return $scope.totalItems;
        }

        $scope.showPagination = function() {
            return   $scope.totalItems >  $scope.sql_limit;
        };

        $scope.pageChanged = function(type){ 
           $scope.$parent.sql_offset = $scope.itemsPerPage  * ($scope.currentPage - 1);

            switch(type) {
                case 'student':
                    $scope.loadStudentsData($scope.sql_limit, $scope.$parent.sql_offset);
                    break;
                case 'course':
                    $scope.loadCoursesData($scope.sql_limit, $scope.$parent.sql_offset);
                    break;
                case 'test':
                    $scope.loadTestsData($scope.sql_limit, $scope.sql_offset);
                default:
                    //do nothing
            } 
        };

        
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
            //pass sql_offset to student/course controller
            $scope.$parent.sql_offset = ($scope.currentPage - 1) * $scope.itemsPerPage; 
        };



          
    }

})();