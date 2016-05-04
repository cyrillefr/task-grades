(function (){
    'use strict';
    
    angular
        .module('studentGradesApp')
        .controller('NotificationsController', NotificationsController);

    NotificationsController.$inject = ['$scope', 'notificationsService'];

    function NotificationsController($scope, notificationsService){
        //Initial load
        getNotifications();

        // -----------     Functions     ------------------------------------
        $scope.$on('eventFailedFired', function(event) {
            getNotifications();
        });

        $scope.$on('eventEmptyNotifications', function() {
            emptyNotifications();
        });

        function getNotifications() {
            $scope.notifications = notificationsService.listNotifications;            
        }

        function emptyNotifications() {
            $scope.notifications = [];
        }
    }



})();