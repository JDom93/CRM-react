export function storeResponseAction(lastResponse) {
    const type = 'STORE_RESPONSE';

    return {
        type,
        lastResponse,
    };
}

export function setCurrentTrackAction(currentTrack) {
    const type = 'SET_CURRENT_TRACK';

    return {
        type,
        currentTrack,
    };
}

export function setCurrentPlaytimeAction(currentPlaytime) {
    const type = 'SET_CURRENT_PLAYTIME';

    return {
        type,
        currentPlaytime,
    };
}

export function setWaveformColorAction(waveformPercentage) {
    const type = 'SET_WAVEFORM_COLOR';
    return {
        type,
        waveformPercentage,
    };
}
