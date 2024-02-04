const playPauseButton = document.querySelector(".btn-play-pause-music-selected");
const audioSevenNationArmy = document.querySelector("#seven-nation-army-audio");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const musicCurrentTimeText = document.querySelector(".music-current-time");

playPauseButton.addEventListener('click', () => {
    if (audioSevenNationArmy.paused) {
        audioSevenNationArmy.play();
        playPauseButton.innerHTML = "";
        playPauseButton.classList.remove("btn-play-pause-music-selected");
        playPauseButton.classList.add("btn-play-pause-music");
    } else {
        audioSevenNationArmy.pause();
        playPauseButton.innerHTML = `<img src="images/play.png" alt="Play pause button icon">`;
        playPauseButton.classList.remove("btn-play-pause-music");
        playPauseButton.classList.add("btn-play-pause-music-selected");
    }
});

audioSevenNationArmy.addEventListener("timeupdate", updateProgressBar);

function updateProgressBar() {
    const percentage = (audioSevenNationArmy.currentTime / audioSevenNationArmy.duration) * 100;
    progressBar.style.width = percentage + '%';
    musicCurrentTimeText.innerHTML = twoDigits(audioSevenNationArmy.currentTime.toFixed(0));
}

function twoDigits(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formatedMinutes = String(minutes).padStart(1, '0');
    const formatedSeconds = String(seconds).padStart(2, '0');

    return `${formatedMinutes}:${formatedSeconds}`;
}

progressContainer.addEventListener("click", setAudioProgress);

function setAudioProgress(event) {
    const totalWidth = progressContainer.offsetWidth;
    const clickX = event.clientX - progressContainer.getBoundingClientRect().left;
    const percentage = (clickX / totalWidth) * 100;
    const newTime = (percentage / 100) * audioSevenNationArmy.duration;

    audioSevenNationArmy.currentTime = newTime;
}