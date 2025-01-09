<script setup>
import { usePlayList } from "../composables/usePlayList.js";
import { ref, useTemplateRef } from "vue";

const trackUrl = ref('');
const trackName = ref('');
const trackType = ref('url');

const { add } = usePlayList();

function updateFile(e) {
    const files = e.target.files || e.dataTransfer.files;
    if (files.length < 1) return;

    const file = files[0];
    const blob = new Blob([file], { type: file.type || 'audio/mp3' });
    trackUrl.value = URL.createObjectURL(blob);
    console.log("Blob URL générée :", trackUrl.value);
    trackName.value = file.name;
}

function addTrack() {
    if (!trackUrl.value) return;

    const name = trackName.value || "Unnamed Track";
    add(name, trackUrl.value);

    // Réinitialiser les champs après ajout
    trackUrl.value = '';
    trackName.value = '';
}

function addOnEnter(event) {
    if (event.key === 'Enter') {
        addTrack();
    }
}
</script>

<template>
    <h2>Add new track</h2>
    <label>Add track</label>
    <select v-model="trackType">
        <option value="url">Via URL</option>
        <option value="file">Via fichier</option>
    </select>
    <input 
        v-if="trackType === 'url'" 
        type="url" 
        placeholder="Enter track URL" 
        v-model="trackUrl" 
        @keyup="addOnEnter" 
        ref="input" 
    />
    <input 
        v-else 
        type="file" 
        @change="updateFile" 
        ref="input" 
    />
    <button @click="addTrack">Add</button>
</template>

<style scoped>
/* Ajoutez vos styles ici */
</style>
