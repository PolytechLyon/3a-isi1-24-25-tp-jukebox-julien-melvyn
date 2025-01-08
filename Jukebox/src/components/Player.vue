<script setup>
    import { usePlayList } from "../composables/usePlayList.js";
    const {
        isPlaying,
        playedTrack,
        pause,
        progression
        } = usePlayList();
</script>

<template>
    <h2>Player</h2>
    <div id="played-track">
        <div v-if="isPlaying">
            <p>Now playing : <playedTrack /></p>
            <span v-if="paused">
                <button @click="pause">play</button>
            </span>
            <span v-else>
                <button @click="pause">pause</button>
            </span>
            <label for="progress-audio">Music progress:</label>
            <progress id="progress-audio" max="1" v-value="progression"></progress>
        </div>
        <div v-else>
            <p>Choose a track to play.</p>
        </div>
    </div>
    <div id="loop-setting">
        <fieldset>
            <legend>Playback mode:</legend>
            <label for="loop-forever">Repeat list</label>
            <input type="radio" id="loop-forever" name="loop-type" checked>
            <label for="loop-track">Repeat track</label>
            <input type="radio" id="loop-track" name="loop-type">
            <label for="loop-once">Don't repeat</label>
            <input type="radio" id="loop-once" name="loop-type">
        </fieldset>
    </div>
</template>

<style scoped>

</style>