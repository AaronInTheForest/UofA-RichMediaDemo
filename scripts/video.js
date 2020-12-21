// https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video
// get the video element and our buttons
const video = document.querySelector('video');
const subtitles = document.querySelector('#subtitles');
const playPauseButton = document.querySelector('#playpause');
const smallButton = document.querySelector('#small');
const normalButton = document.querySelector('#normal');
const bigButton = document.querySelector('#big');


// turn off all subtitles in case any browser turns them on by default. This will work for multiple tracks.
for (let i = 0; i < video.textTracks.length; i++) {
    video.textTracks[i].mode = 'hidden';
}

// build our caption menu
let subtitlesMenu;


let subtitleMenuButtons = [];
let createMenuItem = function(id, lang, label) {
   let listItem = document.createElement('li');
   let button = listItem.appendChild(document.createElement('button'));
   button.setAttribute('id', id);
   button.className = 'subtitles-button';
   if (lang.length > 0) button.setAttribute('lang', lang);
   button.value = label;
   button.setAttribute('data-state', 'inactive');
   button.appendChild(document.createTextNode(label));
   button.addEventListener('click', function(e) {
      // Set all buttons to inactive
      subtitleMenuButtons.map(function(v, i, a) {
         subtitleMenuButtons[i].setAttribute('data-state', 'inactive');
      });
      // Find the language to activate
      let lang = this.getAttribute('lang');
      for (let i = 0; i < video.textTracks.length; i++) {
         // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
         if (video.textTracks[i].language == lang) {
            video.textTracks[i].mode = 'showing';
            this.setAttribute('data-state', 'active');
         }
         else {
            video.textTracks[i].mode = 'hidden';
         }
      }
      subtitlesMenu.style.display = 'none';
   });
   subtitleMenuButtons.push(button);
   return listItem;
}

if (video.textTracks) {
    let df = document.createDocumentFragment();
    let subtitlesMenu = df.appendChild(document.createElement('ul'));
    subtitlesMenu.className = 'subtitles-menu';
    subtitlesMenu.appendChild(createMenuItem('subtitles-off', '', 'Off'));
    for (let i = 0; i < video.textTracks.length; i++) {
        subtitlesMenu.appendChild(createMenuItem('subtitles-' + video.textTracks[i].language, video.textTracks[i].language, video.textTracks[i].label));
    }
    video.appendChild(subtitlesMenu);
}
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

function subtitlesF(){
    if (subtitlesMenu) {
        subtitlesMenu.style.display = (subtitlesMenu.style.display == 'block' ? 'none' : 'block');
     }
}


// add our event listeners to our buttons.
playPauseButton.addEventListener('click', playPause);
smallButton.addEventListener('click', makeSmall);
normalButton.addEventListener('click', makeNormal);
bigButton.addEventListener('click', makeBig);
subtitles.addEventListener('click', subtitlesF);