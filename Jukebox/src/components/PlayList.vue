<script setup>
import { ref } from 'vue'

import { usePlayList } from "../composables/usePlayList.js";
import Track from "./Track.vue";

const {
    tracks,
    playedTrack,
} = usePlayList();
</script>

<template>
    <h2>Playlist</h2>
    <ol v-for="track in tracks" :key="track.index">
        <b v-if="track == playedTrack">
            <Track :track />
        </b>
        <p v-else>
            <Track :track />
        </p>
    </ol>
</template>

<style scoped>

</style>