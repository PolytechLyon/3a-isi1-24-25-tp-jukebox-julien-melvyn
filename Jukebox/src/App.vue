<script setup>
import Player from './components/Player.vue'
import PlayList from './components/PlayList.vue';
import AddNewTrack from './components/AddNewTrack.vue';
</script>

<template>
 	<h1>Jukebox</h1>
	<div class="block">
		<Player /> 
	</div>
	<div class="block">
		<PlayList />
	</div>
	<div class="block">
		<AddNewTrack />
	</div>
</template>

<style scoped>

</style>
