import { computed, readonly, ref } from "vue";

const list = ref([]);
const tracks = readonly(list);
const playedTrackIndex = ref();

function add(title) {
    list.value.push(title);
}

function remove(index) {
    list.value.splice(index, 1);
}

function play(index) {
    playedTrackIndex.value = index;
}

const isPlaying = computed(() => playedTrackIndex.value !== undefined);

const playedTrack = computed(() => list.value[playedTrackIndex.value]);

export function usePlayList() {
    return {
        tracks,
        add,
        remove,
        play,
        isPlaying,
        playedTrack
    }
}