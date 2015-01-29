define(
    [
        'angular',
        'app',
        'api-service',
        'auth-service',
        'messages-service',
        'clients-service'
    ],
    function ( angular, app ) {
        return app.controller( 'MessagesController', function ( $scope, $rootScope, authService, apiService, messagesService, $q, clientsService ) {

            $scope.messages = messagesService.messages.reverse();

            $scope.clients = clientsService.clients;

            $rootScope.$on( 'messagesService:messages_update', function () {

                $scope.messages = messagesService.messages.reverse();
                $scope.$applyAsync();

            } );

            $scope.client = {
                name:   'Сергей Попов',
                avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg',
                logout: function () {

                    //console.log( 'logout!' );

                }
            };

        } );
    }
);