import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TrackResult from './TrackResult';

const ContentResults = () => {
    const cueData = useSelector(
        state => state.response && state.response.cueData
    );
    const cueIds = useSelector(
        state => state.response && state.response.searchCueIDs
    );
    const [tracks, setTracks] = useState([]);

    // Create 50 results per Query.
    useEffect(() => {
        if (cueIds) {
            const currentTracks = cueIds
                .slice(0, 50)
                .map(cueId => cueData[cueId]);
            setTracks(currentTracks);
        }
    }, [cueIds]);

    return (
        <main id="content-results" className="content-results">
            {tracks && tracks.map(track => <TrackResult track={track} />)}
        </main>
    );
};

export default ContentResults;
