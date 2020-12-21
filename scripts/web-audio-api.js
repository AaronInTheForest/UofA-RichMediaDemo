// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API

// for legacy browsers
// const AudioContext = window.AudioContext || window.webkitAudioContext;

// for current browsers
const audioContext = new AudioContext();

// get the audio element and our button and sliders
const audioElement = document.querySelector('audio');
const playButton = document.querySelector('#playpause');
const volumeControl = document.querySelector('#volume');
const pannerControl = document.querySelector('#panner');

// pass the audio source into the audio context
const track = audioContext.createMediaElementSource(audioElement);

// create a gain node to control volume
const gainNode = audioContext.createGain();

// create a stereo panner node to control the left/right balance
const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);


// connect our nodes to the audio context destination. Notice that we chain .connect() methods when adding multiple effects to our sound.
// track.connect(audioContext.destination); 
// track.connect(gainNode).connect(audioContext.destination);
track.connect(gainNode).connect(panner).connect(audioContext.destination);


// declare the functions we will use in our event listeners.
const playPause = function () {
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }
}

const ended = function () {
    playButton.dataset.playing = 'false';
}

const volume = function () {
    gainNode.gain.value = this.value;
}

const pan = function () {
    panner.pan.value = this.value;
}


// add our event listeners
playButton.addEventListener('click', playPause);
audioElement.addEventListener('ended', ended);
volumeControl.addEventListener('input', volume);
pannerControl.addEventListener('input', pan);

// see the following link for further reading
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques