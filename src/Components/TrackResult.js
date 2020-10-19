import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCurrentPlaytimeAction,
    setCurrentTrackAction,
} from '../redux/actions';
import PropTypes from 'prop-types';

const TrackResult = ({ track }) => {
    const dispatch = useDispatch();
    const waveformContainer = useRef(null);
    const currentPlaytime = useSelector(state => state.currentPlaytime);
    const currentTrack = useSelector(state => state.currentTrack || {});
    const waveformPercentage = useSelector(state => state.waveformPercentage);
    const [inset, setInset] = useState(0);

    useEffect(() => {
        // If not the current track, don't highlight.
        if (track.cueID != currentTrack.cueID) {
            return setInset(0);
        }

        if (waveformContainer) {
            // change playback indicator based on Click
            const rect = waveformContainer.current.getBoundingClientRect();

            // set playback indicator based on playtime
            setInset(waveformPercentage);
        }
    }, [currentTrack, currentPlaytime, waveformPercentage]);

    // On Clicking, make this the current track, and set the playtime based on where it is clicked.
    const changeAudio = e => {
        const rect = waveformContainer.current.getBoundingClientRect();
        const playPercentage = e.clientX - rect.left;

        dispatch(setCurrentTrackAction(track));
        dispatch(setCurrentPlaytimeAction((playPercentage * 100) / rect.width));
    };

    // Render Track results
    return (
        <div className="content-result">
            <div className="content-description">
                <h3>{track.cueName}</h3>
                <p>{track.albumName}</p>
            </div>

            <div
                onClick={changeAudio}
                className="content-waveform-container"
                ref={waveformContainer}
            >
                <img
                    class="content-waveform"
                    src={track.waveformPreview}
                    alt="waveform"
                    // This will color the waveform (basically)
                    style={{
                        clipPath: `inset(0 0 0 ${inset}%)`,
                    }}
                />
                <img
                    class="content-waveform-overlay"
                    src={track.waveformPreview}
                    alt=""
                    style={{ clipPath: `inset(0 ${100 - inset}% 0 0)` }}
                />
            </div>
            <p className="content-tags">{track.cueStyles.join(', ')}</p>
        </div>
    );
};

TrackResult.propTypes = {
    track: PropTypes.object.isRequired,
};

export default TrackResult;
