define(
    [
        'app',
        'api-service',
        'auth-service',
        'messages-service'
    ],
    function ( app ){
        return app.controller( 'MessagesController', function( $scope, authService, apiService, messagesService ){

            $scope.messages = messagesService.messages;

        } );
    }
);