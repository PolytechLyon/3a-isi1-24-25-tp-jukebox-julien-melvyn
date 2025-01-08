<script setup>
    import { usePlayList } from "../composables/usePlayList.js";
    const {
        isPlaying,
        playedTrack
        } = usePlayList();
</script>

<template>
    <h2>Player</h2>
    <div v-if="isPlaying">
        <p>Now playing : <playedTrack /></p>
    </div>
    <div v-else>
        <p>Choose a track to play.</p>
    </div>
</template>

<style scoped>

</style>