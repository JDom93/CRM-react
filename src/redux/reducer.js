export default function (state = {}, action) {
    if (action.type == 'STORE_RESPONSE') {
        return Object.assign({}, state, {
            response: action.lastResponse,
        });
    }

    if (action.type == 'SET_CURRENT_TRACK') {
        return Object.assign({}, state, {
            currentTrack: action.currentTrack,
        });
    }

    if (action.type == 'SET_CURRENT_PLAYTIME') {
        return Object.assign({}, state, {
            currentPlaytime: action.currentPlaytime,
        });
    }

    return state;
}
