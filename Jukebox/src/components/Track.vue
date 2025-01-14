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
    <ul>
        <span :style="[props.track.isBlocked == true ? 'text-decoration: line-through' : '']">{{ props.track.title }}</span>
        <button @click="playTrack" :disabled="props.track.isBlocked == true">play</button>
        <button @click="removeTrack">delete</button>
    </ul>
</template>

<style scoped>
</style>