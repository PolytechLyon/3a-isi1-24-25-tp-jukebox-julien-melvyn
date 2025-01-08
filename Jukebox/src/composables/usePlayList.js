import { computed, readonly, ref } from "vue";

const list = ref([]);
const tracks = readonly(list);
const playedTrackIndex = ref();
const paused = ref(false);

function add(trackName, trackUrl) {
    const track = {
        index : list.value.length+1,
        title : trackName,
        url : trackUrl
    }
    list.value.push(track);
}

function remove(index) {
    list.value.splice(index-1, 1);
}

function play(index) {
    playedTrackIndex.value = index;
}

function pause() {
    paused = !paused;
}

const isPlaying = computed(() => playedTrackIndex.value !== undefined);

const playedTrack = computed(() => list.value[playedTrackIndex.value]);

const progression = isPlaying ? 0 : list.value[playedTrackIndex.value];

export function usePlayList() {
    return {
        tracks,
        add,
        remove,
        play,
        isPlaying,
        playedTrack,
        pause,
        paused,
        progression
    }
}