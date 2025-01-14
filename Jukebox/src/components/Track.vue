<script setup>

import { usePlayList } from "../composables/usePlayList.js";

const props = defineProps({
    track: Object   
});

const {
    remove,
    play
} = usePlayList();

function removeTrack() {
    remove(props.track.index);
}

function playTrack() {
    play(props.track.index);
}

</script>

<template>
    <li>
        <span>{{ props.track.title }}</span>
        <button @click="playTrack"  >play</button>
        <button @click="removeTrack">delete</button>
    </li>
</template>

<style scoped>
</style>