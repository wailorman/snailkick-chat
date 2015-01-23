define(
    [
        'app'
    ],
    function ( app ) {
        return app.service( 'messagesService', function ( apiService, authService ) {

            this.messages = [
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs424630.vk.me/v424630762/26b8/2VjOW60CaoI.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Что-то по-русски',
                    client: { name: 'Сергей Попов', avatar: 'http://cs620724.vk.me/v620724301/2748/f12lLJZn8aM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur',
                    client: { name: 'Сергей Попов', avatar: 'http://cs424630.vk.me/v424630762/26b8/2VjOW60CaoI.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquad',
                    client: { name: 'Сергей Попов', avatar: 'http://cs620724.vk.me/v620724301/2748/f12lLJZn8aM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur',
                    client: { name: 'Сергей Попов', avatar: 'http://cs424630.vk.me/v424630762/26b8/2VjOW60CaoI.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
                    client: { name: 'Сергей Попов', avatar: 'http://cs314730.vk.me/v314730142/c473/UFnidpMxrQM.jpg' },
                    posted: new Date()
                },
                {
                    text:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquad',
                    client: { name: 'Сергей Попов', avatar: 'http://cs620724.vk.me/v620724301/2748/f12lLJZn8aM.jpg' },
                    posted: new Date()
                }
            ];

        } );
    }
);