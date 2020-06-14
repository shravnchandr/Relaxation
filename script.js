const container = document.querySelector('.container')
const text = document.querySelector('#text')

const totalTime = 12000
const inhaleTime = (totalTime / 3)
const holdTime = (totalTime / 3)
const exhaleTime = (totalTime / 3)

breatheAnimation()

function breatheAnimation() {
    text.innerHTML = 'Inhale'
    container.className = 'container grow'

    setTimeout(() => {
        text.innerText = 'Hold'

        setTimeout(() => {
            text.innerText = "Exhale"
            container.className = 'container shrink'
        }, holdTime)
    }, inhaleTime)
}

setInterval(breatheAnimation, totalTime)

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let gC = document.querySelector(".gradient-circle");
let volume_slider = document.querySelector(".volume_slider");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [{
        name: "Ocean",
        image: "./images/ocean.jpg",
        path: "./music/ocean.mp3",
        circleColor: "conic-gradient(rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
    },
    {
        name: "Nature",
        image: "./images/nature.jpg",
        path: "./music/nature.mp3",
        circleColor: "conic-gradient(rgba(210,218,17,1) 0%, rgba(46,138,37,1) 100%)"
    },
    {
        name: "City",
        image: "./images/city.jpg",
        path: "./music/city.mp3",
        circleColor: "conic-gradient(rgba(165, 182, 210, 1) 0%, rgba(249, 170, 65, 1) 74%, rgba(8, 3, 9, 1) 94%, rgba(29, 17, 19, 1) 100%)"
    },
];

function loadTrack(track_index) {

    curr_track.src = track_list[track_index].path;
    curr_track.load();

    curr_track.addEventListener("ended", nextTrack);
    document.body.style.background = "url(" + track_list[track_index].image + ") no-repeat center/cover";
    gC.style.background = track_list[track_index].circleColor;
    document.getElementById('Title').innerHTML = track_list[track_index].name;
}

loadTrack(track_index);

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length;
    loadTrack(track_index);
    playTrack();
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}