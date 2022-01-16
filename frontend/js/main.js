document.addEventListener('DOMContentLoaded', function()
{
    const socket = io('https://quizello.herokuapp.com');

    window.vm = new Vue({
        el: '#vapp',
        data: {
            newRoom: {
                owner: '',
                name: '',
                maxPlayers: ''
            },
            user: {
                name: '',
                selectedRoomId: ''
            },
            joinedRoomData: {},
            usersInRoom: '',
            question: {},
            timer: 15,
            selectedVariant: null,
            correctVariant: null,
            rooms: []
        },

        created: function() {
            socket.on('refreshRooms', function(roomData){
                vm.$data.rooms = JSON.parse(roomData);
            });

            socket.on('joinedRoom', function(data){
                var joinedRoomData = JSON.parse(data);
                console.log(joinedRoomData);
                vm.$data.joinedRoomData = joinedRoomData;
            });

            socket.on('refreshPlayers', function(players){
                let playersJson = JSON.parse(players);
                vm.$data.joinedRoomData.players = playersJson;
            });

            socket.on('newQuestion', function (question) {
                let questionJson = JSON.parse(question);
                vm.$data.question = {
                    id: questionJson.id,
                    text: questionJson.question,
                    variants: questionJson.variants
                };
                vm.$data.timer = 15;
                vm.$data.correctVariant = null;
                vm.$data.selectedVariant = null;
            });

            socket.on('timer', function(seconds) {
                vm.$data.timer = seconds;
            });

            socket.on('correctAnswer', handleAnswerResponse);
            socket.on('wrongAnswer', handleAnswerResponse);

            function handleAnswerResponse(data) {
                let dataJson = JSON.parse(data);
                let selectedVariant = dataJson.selectedVariant;
                let correctVariant = dataJson.correctVariant;

                vm.$data.correctVariant = correctVariant;
                vm.$data.selectedVariant = selectedVariant;
            }
        },

        methods: {
            createRoom: function(event) {
                event.preventDefault();
                socket.emit('newRoom', JSON.stringify(this.newRoom));
            },

            joinRoom: function(roomId) {
                this.user.selectedRoomId = roomId;
            },

            cancelJoin: function() {
                this.user.selectedRoomId = null;
            },

            joinRoomSubmit: function(event) {
                event.preventDefault();
                socket.emit('joinRoom', JSON.stringify(this.user));
            },

            answer: function(questionId, variantId) {
                socket.emit('answerQuestion', JSON.stringify({ questionId: questionId, variantId: variantId, roomId: this.joinedRoomData.id}));
            }
        }
    })
});
