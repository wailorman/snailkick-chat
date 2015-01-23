define(
    [
        'angular',
        'app',
        'api-service',
        'auth-service',
        'messages-service'
    ],
    function ( angular, app ){
        return app.controller( 'MessagesController', function( $scope, authService, apiService, messagesService ){

            $scope.messages = messagesService.messages;
            $scope.client = {
                name: 'Сергей Попов',
                avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg',
                logout: function(){

                    console.log( 'logout!' );

                }
            }

        } );
    }
);