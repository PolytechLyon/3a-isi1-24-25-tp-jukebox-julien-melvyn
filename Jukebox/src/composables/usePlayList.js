import { computed, readonly, ref } from "vue";

const list = ref([]);           // Liste des pistes
const tracks = readonly(list);  // Liste en lecture seule
const playedTrackIndex = ref(); // Index de la piste en cours de lecture
const paused = ref(true);       // État de pause

// Ajout d'une piste à la liste
function add(trackName, trackUrl) {
    const track = {
        index: list.value.length,
        title: trackName,
        url: trackUrl,
    };
    list.value.push(track);
}

// Suppression d'une piste et révocation de l'URL blob si nécessaire
function remove(index) {
    const track = list.value[index];
    if (track?.url.startsWith("blob:")) {
        console.log(`Révocation de l'URL blob : ${track.url}`);
        URL.revokeObjectURL(track.url);
    }

    // Réinitialiser la piste en cours de lecture si elle est supprimée
    if (index === playedTrackIndex.value) {
        playedTrackIndex.value = undefined;
    }

    if (list.value.length > 1) {
        list.value.splice(index, 1);
    } else {
        list.value = [];
    }
}

// Lecture d'une piste
function play(index) {
    playedTrackIndex.value = index;
}

// Pause ou reprise de la lecture
function pause() {
    paused.value = !paused.value;
}

// Réinitialisation de la liste et révocation de tous les blobs
function clearAllTracks() {
    list.value.forEach((track) => {
        if (track.url.startsWith("blob:")) {
            console.log(`Révocation de l'URL blob : ${track.url}`);
            URL.revokeObjectURL(track.url);
        }
    });
    list.value = [];
    playedTrackIndex.value = undefined;
}

// Calculs dérivés
const isPlaying   = computed(() => playedTrackIndex.value !== undefined);
const playedTrack = computed(() => list.value[playedTrackIndex.value]);
const progression = computed(() => (isPlaying.value ? 0 : null));

// Export des fonctions et propriétés
export function usePlayList() {
    return {
        tracks,
        add,
        remove,
        play,
        pause,
        clearAllTracks,
        isPlaying,
        playedTrack,
        paused,
        progression,
    };
}
