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

                controller: [
                    '$scope', 'authService',
                    function ( $scope, authService ) {

                        $scope.redirectToVkAuthPage = authService.redirectToVkAuthPage;

                    } ],

                //templateUrl: 'app/chat-box/chat-box.html'
                template:   '<div class="snailkick-chat-box" ng-controller="MessagesController">\n\n    <!-- powered by wailorman <wailorman@gmail.com> -->\n\n    <div class="client-bar" ng-show="chatBoxState == \'messages\'">\n        <div class="avatar" style="background-image: url({{ userClient.avatar }})"></div>\n        <div class="name"><a target="_blank" ng-href="{{ userClient.profile.vk.profileUrl }}">{{ userClient.name }}</a></div>\n        <div class="logout" ng-click="logout()">\n            Выход\n        </div>\n\n        <div class="king-online-bar" ng-show="showKingOnlineBar">\n            Хозяин {{ isKingOnline ? \'онлайн\' : \'оффлайн\' }}\n        </div>\n    </div>\n\n    <div class="messages-list"\n         ng-show="chatBoxState == \'messages\' || chatBoxState == \'auth\'"\n         ng-class="{ \'transparent\': chatBoxState == \'auth\', \'show-king-bar\': showKingOnlineBar }"\n         scroll-glue>\n\n        <div class="message"\n             ng-repeat="message in messages">\n\n            <a target="_blank" ng-href="{{ clients[ message.client ].profile.vk.profileUrl }}">\n                <div class="avatar" style="background-image: url({{ clients[ message.client ].avatar }})"></div>\n            </a>\n\n            <div class="message-content-box">\n\n                <div class="message-title">\n\n                    <div class="hide"> client id: {{ message.client }}</div>\n\n                    <div class="client-name" ng-click="reply( message.client )">\n                        {{ clients[ message.client ].name }}\n\n                        <div class="statuses">\n\n                            <div class="status {{ statusName }}"\n                                 tooltip="{{ statusesDescription[statusName] }}"\n                                 tooltip-placement="right"\n                                 ng-repeat="(statusName, statusBooleanValue) in clients[ message.client ].statuses"></div>\n\n                        </div>\n\n                    </div>\n                    <div class="posted-time">\n                        {{ convertPostedTime( message.posted ) }}\n                    </div>\n\n                </div>\n\n                <div class="message-text" ng-bind-html="message.text">\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    <div class="typing-box" ng-show="chatBoxState == \'messages\'"\n         ng-keypress="onKeyPress($event)">\n\n        <input type="text" class="text" ng-model="messageToSend"/>\n\n        <div class="send-button" ng-click="sendMessage()"></div>\n\n    </div>\n\n    <div class="banned-box" ng-show="chatBoxState == \'banned\'">\n\n        <h1>You are banned.</h1>\n\n    </div>\n\n    <div class="auth-box" ng-show="chatBoxState == \'auth\'">\n\n        <h1>Чат открыт!</h1>\n\n        <h2>Чтобы присоединиться к нашей беседе, просто залогинься через:</h2>\n\n        <div class="auth-buttons-container">\n            <div class="auth-button vk" ng-click="redirectToVkAuthPage()"></div>\n        </div>\n\n\n        <!--<div class="problems">Проблемы с авторизацией?</div>-->\n\n    </div>\n\n    <div class="power-off-box" ng-show="chatBoxState == \'power-off\'">\n\n        <h1>\n            Чат пока что не работает, <br>\n            бла-бла-бла, <br>\n            но скоро будет.\n        </h1>\n\n        <div class="power-off-icon"></div>\n\n    </div>\n\n    <div class="loading-box" ng-show="chatBoxState == \'loading\'">\n\n        <div class="loading-image"></div>\n\n    </div>\n\n</div>'

            };

        } );

    }
);