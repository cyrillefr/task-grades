(function (){
    'use strict';
    
    angular
        .module('studentGradesApp')
        .controller('StudentGradesAppController', StudentGradesAppController);

    StudentGradesAppController.$inject = ['$scope', '$translate', '$http', 'notificationsService'];

    function StudentGradesAppController($scope, $translate, $http, notificationsService) {


        /* --------- default request size -------- */
        $scope.sql_limit = 5;
        $scope.sql_offset_default = 0;
        $scope.sql_offset_current = 0;

        /* -- to keep track if test has been just created or updated. */
        $scope.NO_TEST_CREATED = 0;
        $scope.TEST_CREATED = 1;
        $scope.TEST_UPDATED = 2;
        $scope.testCreatedOrUpdated = $scope.NO_TEST_CREATED;


        /* ----------- Localization -------------------------- */
        //change locale display on the front 
        //as well as in the back
        $scope.changeLocale = function (langKey) {
           $translate.use(langKey);
           $http.get('/update_locale/' + langKey).then(
                function successCallback(response){
                }
            );
        };    

        /* ----------- Notifications ------------------------ */
        $scope.delNotifications = function () {
             notificationsService.sendEventEmptyNotifications();
        }


    }

})();