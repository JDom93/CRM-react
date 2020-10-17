import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPlaytimeAction } from '../redux/actions';

const ContentPlayer = () => {
    const dispatch = useDispatch();
    const waveformContainer = useRef({});
    const audioEl = useRef({});
    const currentTrack = useSelector(state => state.currentTrack);
    const currentPlaytime = useSelector(state => state.currentPlaytime || 0);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [audioLoaded, setAudioLoaded] = useState(false);

    // Change Playtime based on wave indicator
    useEffect(() => {
        const audio = audioEl.current;

        // Set set Audio Playback Time based on waveform indicator
        if (audio && currentTrack) {
            audio.currentTime =
                (currentTrack.fullDuration * (currentPlaytime / 100)) / 1000;
        }
    }, [currentPlaytime, audioEl, currentTrack]);

    // Setup a listener to reset audio el when finished, and to set Playing Flag to true
    useEffect(() => {
        const audio = audioEl.current;

        if (audio && currentTrack) {
            audio.addEventListener('ended', () => {
                audio.pause();
                audio.currentTime = 0;
            });

            audio.addEventListener('play', () => {
                setAudioPlaying(true);
            });
        }
    }, [audioEl, currentTrack]);

    const setPlaybackTime = e => {
        const rect = waveformContainer.current.getBoundingClientRect();
        const playPercentage = e.clientX - rect.left;

        dispatch(setCurrentPlaytimeAction((playPercentage * 100) / rect.width));
    };

    const toggleAudio = () => {
        const audio = audioEl.current;

        if (audioPlaying) {
            setAudioPlaying(false);
            audio.pause();
        } else {
            setAudioPlaying(true);
            audio.play();
        }
    };

    return (
        <div id="content-player" className="content-player">
            <div className="content-player-button">
                <i
                    onClick={toggleAudio}
                    id="audio-play"
                    // Change logo based on audio playing
                    className={
                        audioPlaying
                            ? 'far fa-pause-circle fa-2x'
                            : 'far fa-play-circle fa-2x'
                    }
                ></i>
                <i
                    onClick={() => {
                        setAudioPlaying(false);
                        audioEl.current.pause();
                        audioEl.current.currentTime = 0;
                    }}
                    id="audio-stop"
                    className="far fa-stop-circle fa-2x"
                    // change logo based on audio playing, too!
                    style={
                        audioPlaying
                            ? { color: 'var(--color-text)' }
                            : { color: 'var(--color-light)' }
                    }
                ></i>
            </div>
            {currentTrack && (
                <div
                    onClick={setPlaybackTime}
                    className="content-waveform-container"
                    ref={waveformContainer}
                >
                    <img
                        class="content-waveform"
                        src={currentTrack.waveformPreview}
                        alt="waveform"
                        style={{
                            clipPath: `inset(0 0 0 ${currentPlaytime}%)`,
                        }}
                    />
                    <img
                        class="content-waveform-overlay"
                        src={currentTrack.waveformPreview}
                        alt=""
                        // This will color the waveform (basically)
                        style={{
                            clipPath: `inset(0 ${100 - currentPlaytime}% 0 0)`,
                        }}
                    />
                    <audio
                        autoplay="true"
                        src={currentTrack.fullLengthPreview}
                        ref={audioEl}
                    />
                </div>
            )}
        </div>
    );
};

export default ContentPlayer;
