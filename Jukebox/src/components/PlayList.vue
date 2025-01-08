<script setup>
import { ref } from 'vue'

import { usePlayList } from "../composables/usePlayList.js";
import Track from "./Track.vue";

const { tracks } = usePlayList();
</script>

<template>
    <ol v-for="track in tracks" :key="track.index">
        <Track :track />
    </ol>
</template>

<style scoped>

</style>