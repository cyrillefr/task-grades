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


        /* ----------- Localization --------------------------- */
        //change locale display on the front 
        //as well as in the back
        $scope.changeLocale = function (langKey) {
           $translate.use(langKey);
           $http.get('/update_locale/' + langKey).then(
                function successCallback(response){
                }
            );
        };    


        $scope.delNotifications = function () {
             notificationsService.sendEventEmptyNotifications();
        }

    }

})();