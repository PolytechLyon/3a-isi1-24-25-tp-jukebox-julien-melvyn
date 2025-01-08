<script setup>

import { usePlayList } from "../composables/usePlayList.js";
import { ref, useTemplateRef, watchEffect } from "vue";

const title = ref('');
const input = useTemplateRef('input');
const {
    add,
    isPlaying,
} = usePlayList();

function addTrack() {
    add(title.value);
    title.value = '';
}

function addOnEnter(event) {
    event.key === 'Enter' && addTrack();
}

watchEffect(() => {
    if (!isPlaying.value) {
        input.value?.focus();
    }
});

</script>

<template>
    <h2>Add new track</h2>
    <label>Add track</label>
    <select>
        <option>Via Url</option>
        <option>Via fichier</option>
    </select>
    <input type="url" placeholder="url" @keyup="addOnEnter" v-model="title" ref="input"/>
    <button @click="addTrack">Add</button>
</template>

<style scoped>

</style>