<script setup>
import { ref, watchEffect } from "vue";
import { usePlayList } from "../composables/usePlayList.js";

const {
    isPlaying,
    playedTrack,
    mettreEnPause,
    progression,
    paused,
    block,
    playNextTrack,
    playingSameTrack,
    stopPlaying,
} = usePlayList();

const audioRef    = ref(null);
const progressRef = ref(null); // Référence à la barre de progression
const loopingType = ref(0);

// Fonction pour basculer entre play et pause
function togglePause() {
    if (!audioRef.value || playedTrack.value === undefined || playedTrack.value.isBlocked == true) {
        console.error("Audio error");
        return;
    }

    // Si l'audio est en pause, on le lance
    if (paused.value) {
        console.log("Playing audio...");
        audioRef.value.play().then(() => {
            console.log("Lecture démarrée avec succès !");
        }).catch(() => {
            console.error("");
        });
    } else { // Sinon on le met en pause
        if (!playedTrack.value.isBlocked && playedTrack.value !== null) {
            console.log("Pausing audio...");
            audioRef.value.pause();
        }
    }

    // Basculer l'état de la pause
    mettreEnPause();
}

// Fonction appelée quand l'audio est chargé
function onAudioLoaded() {
    console.log("Audio chargé avec succès !");
    console.log(audioRef.value + isPlaying.value);
    if (audioRef.value && isPlaying.value) {
        console.log("play");
        audioRef.value.play().then(() => {
            console.log("Lecture démarrée avec succès !");
        }).catch(() => {
            console.error("Error on onAudioLoaded -> Blocked");
            block(playedTrack.value);
        });
    }
}

// Fonction pour mettre à jour la barre de progression
function updateProgress() {
    if (audioRef.value && progressRef.value) {
        const progress = (audioRef.value.currentTime / audioRef.value.duration) || 0;
        progressRef.value.value = progress;
    }
}

function changeAudioPosition(event) {
    var progressBar = event.target;

    var x = event.pageX - progressBar.getBoundingClientRect().left;
    var newValue = audioRef.value.duration * (x / progressBar.offsetWidth);
    
    audioRef.value.currentTime = newValue;
}

function nextTrack() {
    //audioRef.value.currentTime = 0;
    playNextTrack(loopingType);
    if (playingSameTrack.value === true) { // pause and play to start the track again
        console.log("next track, playingSameTrack");
        togglePause();
        togglePause();
    }
    else if (stopPlaying.value === true) { // if no music is played after, set the "play" button to "play" instead of "pause"
        togglePause();
    }
}

function changeLooping(event) { // update which radio button is on
    if(event.target.id === "loop-forever") loopingType.value = 0;
    if(event.target.id === "loop-track")   loopingType.value = 1;
    if(event.target.id === "loop-once")    loopingType.value = 2;
    if(event.target.id === "loop-never")   loopingType.value = 3;
}

// Observer les changements de la piste jouée
watchEffect(() =>  {
    console.log("Change music");
    if (audioRef.value !== null && playedTrack.value !== undefined) {
        console.log("will play : "+playedTrack.value.index);
        audioRef.value.src = playedTrack.value.url;
    }
});

function onError() {
    console.error("Erreur fichier non musical");
    block(playedTrack.value);
    nextTrack();
}

</script>

<template>
    <h2>Player</h2>
    <div id="played-track">
        <div v-if="playedTrack && !playedTrack.isBlocked && playedTrack.url">
            <p>Now playing: {{ playedTrack.title }}</p>
            <audio id="audio" ref="audioRef" @loadeddata="onAudioLoaded" @timeupdate="updateProgress" @ended="nextTrack" @error="onError" :autoplay="playingSameTrack.value" >
                <source :src="playedTrack.url" type="audio/ogg">
            </audio>
            <button v-if="paused" @click="togglePause">Play</button>
            <button v-else        @click="togglePause">Pause</button>
            <label for="progress-audio">Music progress:</label>
            <br/> <progress ref="progressRef" id="progress-audio" max="1" :value="progression" @click="changeAudioPosition"></progress>
        </div>
        <div v-else>
            <p>Choose a track to play.</p>
        </div>
    </div>
    <div id="loop-setting">
        <fieldset>
            <legend>Playback mode:</legend>
            <label for="loop-forever">Repeat list</label>
            <input type="radio" id="loop-forever" name="loop-type" @click="changeLooping" checked>
            <label for="loop-track">Repeat track</label>
            <input type="radio" id="loop-track" name="loop-type" @click="changeLooping">
            <label for="loop-once">Loop once</label>
            <input type="radio" id="loop-once" name="loop-type" @click="changeLooping">
            <label for="loop-never">Never repeat</label>
            <input type="radio" id="loop-never" name="loop-type" @click="changeLooping" class="last-one">
        </fieldset>
    </div>
</template>

<style scoped>
/* Style optionnel pour améliorer l'apparence */
</style>
