import { computed, readonly, ref } from "vue";

const list = ref([]);           // Liste des pistes
const tracks = readonly(list);  // Liste en lecture seule
const playedTrackIndex = ref(); // Index de la piste en cours de lecture
const paused = ref(false);      // État de pause
const playingSameTrack = ref(false);
const stopPlaying = ref(false);

// Ajout d'une piste à la liste
function add(trackName, trackUrl) {
    const track = {
        index: list.value.length,
        title: trackName,
        url: trackUrl,
        isBlocked: false,
    };
    list.value.push(track);
}

function block(track) {
    track.isBlocked = true;
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
function mettreEnPause() {
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

function playNextTrack(loopingType) {
    console.log("playNextTrack");
    const oldTrack = playedTrackIndex.value;

    if(loopingType.value === 2) {
        playingSameTrack.value = false;

    } else {
        playingSameTrack.value = (oldTrack === playedTrackIndex.value);
    }

    if(loopingType.value === 0) {
        if (playedTrack.value.isBlocked == true) {
            playedTrackIndex.value += 1;
            playNextTrack(loopingType.value);
            return;
        }
        playedTrackIndex.value += 1;
        playedTrackIndex.value = playedTrackIndex.value % list.value.length;
        play(playedTrackIndex.value);
        return;
    }
    if(loopingType.value === 1) {
        if (playedTrack.value.isBlocked == true) {
            return;
        }
        play(playedTrackIndex.value);
    }
    if(loopingType.value === 2) {
        if(playedTrackIndex.value !== list.value.length-1) {
            if (playedTrack.value.isBlocked == true) {
                playedTrackIndex.value += 1;
                playNextTrack(loopingType.value);
                return;
            }
            playedTrackIndex.value += 1;
            play(playedTrackIndex.value);
            return;
        }
        else {
            stopPlaying.value = true;
        }
    }
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
        mettreEnPause,
        clearAllTracks,
        isPlaying,
        playedTrack,
        paused,
        progression,
        block,
        playNextTrack,
        playingSameTrack,
        stopPlaying,
    };
}
