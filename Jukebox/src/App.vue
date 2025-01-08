<script setup>
import Player from './components/Player.vue'
import PlayList from './components/PlayList.vue';
import AddNewTrack from './components/AddNewTrack.vue';
</script>

<template>
 	<h1>Jukebox</h1>
	<Player /> 
  <h1>Playlist</h1>
  <PlayList />
  <h1>Add new track</h1>
  <add-new-track />
  
</template>

<style scoped>

</style>
