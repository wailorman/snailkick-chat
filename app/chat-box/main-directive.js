define(
    [
        'app',
        'messages-controller'
    ],
    function ( app ) {

        console.log( 'snailkick chat (main) directive' );

        return app.directive( "snailkickChat", function () {

            return {

                restrict: 'E',

                controllerAs: 'ChatBoxController',

                controller: function ( $scope, authService ) {

                    $scope.redirectToVkAuthPage = authService.redirectToVkAuthPage;

                },

                templateUrl: 'app/chat-box/chat-box.html'

            };

        } );

    }
);