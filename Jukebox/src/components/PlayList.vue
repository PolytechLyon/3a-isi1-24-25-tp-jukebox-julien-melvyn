<script setup>
import { ref } from 'vue'

import { usePlayList } from "../composables/usePlayList.js";
import Track from "./Track.vue";

const { tracks } = usePlayList();
</script>

<template>
    <h2>Playlist</h2>
    <ol v-for="(title, index) in tracks" :key="index">
        <Track :title :index />
    </ol>
</template>

<style scoped>

</style>