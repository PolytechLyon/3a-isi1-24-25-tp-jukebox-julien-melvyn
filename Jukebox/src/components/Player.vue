<script setup>
    import { usePlayer } from "../composables/usePlayer.js";
    const { isPlaying } = usePlayer();
</script>

<template>
    <h2>Player</h2>
    <div v-if="isPlaying">

    </div>
    <div v-else>
        <p>Choose a track to play.</p>
    </div>
</template>

<style scoped>

</style>