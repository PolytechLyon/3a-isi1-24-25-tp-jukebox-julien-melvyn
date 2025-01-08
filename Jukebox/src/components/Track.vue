<script setup>

import { usePlayList } from "../composables/usePlayList.js";

const props = defineProps({
    title: String,
    index: Number,
});

const {
    remove,
    play
} = usePlayList();

function removeTrack() {
    remove(props.index);
}

function playTrack() {
    play(props.index);
}

</script>

<template>
    <li>
        <span>{{ props.title }}</span>
        <button @click="playTrack">play</button>
        <button @click="removeTrack">delete</button>
    </li>
</template>

<style scoped>
</style>