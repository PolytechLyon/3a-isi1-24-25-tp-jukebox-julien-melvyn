<script setup>

import { usePlayList } from "../composables/usePlayList.js";
import { ref, useTemplateRef, watchEffect } from "vue";

const trackUrl  = ref('');
const trackName = ref('');
const input = useTemplateRef('input');
const trackType = ref('url');

const {
    add,
    isPlaying,
} = usePlayList();

function updateFile(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (files.length < 1) {
        return;
    }
    trackUrl.value = files[0];
    trackName.value = trackUrl.value.name;
}

function addTrack() {
    add(trackName.value, trackUrl.value);
    
    trackUrl.value = '';
    trackName.value = '';
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
    <select v-model="trackType">
        <option value="url">Via Url</option>
        <option value="file">Via fichier</option>
    </select>
    <input  v-if="trackType==='url'" type="url" placeholder="url" @keyup="addOnEnter" v-model="trackUrl" ref="input"/>
    <input  v-else type="file" @keyup="addOnEnter" @change="updateFile" ref="input"/>
    <button @click="addTrack">Add</button>
</template>

<style scoped>

</style>