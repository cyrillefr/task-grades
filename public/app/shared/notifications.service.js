(function (){
    'use strict';

    angular
        .module('studentGradesApp')
        .factory('notificationsService', notificationsService);  


    notificationsService.$inject = ['$rootScope'];


    function notificationsService($rootScope){

        //Exposing functions
        var notificationsService = {
            sendEventFailed: sendEventFailed,
            sendEventEmptyNotifications: sendEventEmptyNotifications
        };

         return notificationsService;

         // -----------         Functions      ------------------------
        function sendEventFailed(notifications){
            if(typeof notifications === 'string'){
                try {
                    var json = JSON.parse(notifications);
                    var arrayOfNotifications = [];
                    //ActiveRecords send stuff like
                    //error{\"first_name\":[\"First name cannot be blank, Task not saved\"] ...
                    //must get rid of [ and  ]
                    angular.forEach(json, function(value, key) {
                        if( Object.prototype.toString.call(value) === '[object Array]'){
                            this.push(value[0]);
                        } else {
                            this.push(value);
                        }
                    }, arrayOfNotifications);
                    notificationsService.listNotifications = arrayOfNotifications;
                } catch (exception) {
                    notificationsService.listNotifications = [notifications];
                }

            } else {
                notificationsService.listNotifications = notifications;    
            }

             $rootScope.$broadcast('eventFailedFired');
        }


        function sendEventEmptyNotifications() {
            $rootScope.$broadcast('eventEmptyNotifications');   
        }

       
    }   


})();