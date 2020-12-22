// get the video element and our buttons

const video = document.querySelector('video');
const playPauseButton = document.querySelector('#playpause');
const smallButton = document.querySelector('#small');
const normalButton = document.querySelector('#normal');
const bigButton = document.querySelector('#big');
const faster = document.querySelector('#faster');
const slower = document.querySelector('#slower');

// declare the functions we will use in our event listeners.
function playPause() {
    if (video.paused)
        video.play();
    else
        video.pause();
}

function makeBig() {
    video.style.width = '100%';
}

function makeNormal() {
    video.style.width = '60%';
}

function makeSmall() {
    video.style.width = '30%';
}

function speedUp(){
    video.playbackRate += 0.5;
}

function speedDown(){
    video.playbackRate -= 0.5;
}

// add our event listeners to our buttons.
playPauseButton.addEventListener('click', playPause);
smallButton.addEventListener('click', makeSmall);
normalButton.addEventListener('click', makeNormal);
bigButton.addEventListener('click', makeBig);
faster.addEventListener('click', speedUp);
slower.addEventListener('click', speedDown);
