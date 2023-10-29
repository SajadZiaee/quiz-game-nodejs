# Realtime multiplayer quiz game with Node.js
Users can create or join the available rooms. The game uses an 'Open Trivia Database' to fetch some random questions. Each game consists of 10 random questions.

## Install dependencies:
npm install

## Run project in watch mode:
npm run watch

## Run project inside docker container
build the container image:  `sudo docker build . -t ilyas0v/node-quiz-app` \
then run the built image: `sudo docker run -p  3333:3000 -d ilyas0v/node-quiz-app` \
check the container status: `sudo docker ps` \
the app should be run on: `http://0.0.0.0:3333/`

## Demo
https://quizello.herokuapp.com
