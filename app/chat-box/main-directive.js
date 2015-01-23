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

                //templateUrl: 'app/chat-box/chat-box.html'
                template: '<div class="snailkick-chat-box" ng-controller="MessagesController">\n\n    <!--<button ng-click="redirectToVkAuthPage()">\n        redirectToVkAuthPage\n    </button>-->\n    \n    <div class="client-bar">\n        <div class="avatar" style="background-image: url({{ client.avatar }})"></div>\n        <div class="name"> {{ client.name }} </div>\n        <div class="logout">\n            Выход\n        </div>\n    </div>\n\n    <div class="messages-list" scroll-glue>\n\n        <div class="message"\n             ng-repeat="message in messages">\n\n            <div class="avatar" style="background-image: url({{ message.client.avatar }})"></div>\n\n            <div class="message-content-box">\n\n                <div class="message-title">\n\n                    <div class="client-name">\n                        {{ message.client.name }}\n                    </div>\n                    <div class="posted-time">\n                        {{ message.posted.getHours() }}:{{ message.posted.getMinutes() }}\n                    </div>\n\n                </div>\n\n                <div class="message-text">\n                    {{ message.text }}\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    <div class="typing-box">\n\n        <input type="text" class="text"/>\n        <div class="send-button"></div>\n\n    </div>\n\n</div>'

            };

        } );

    }
);