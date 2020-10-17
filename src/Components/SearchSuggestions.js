import React from 'react';
import PropTypes from 'prop-types';

const SearchSuggestions = ({ filters, findMusic, setQuery }) => {
    if (!filters) {
        console.log('no filters');
        return null;
    }

    const { Alben, Instrument, Keyword, ProductionType, Style } = filters;

    // Only display fields if there are suggestions present
    // Limited to 15 items per filter
    return (
        <div id="suggestions" className="search-suggestions">
            {/* Alben */}
            {Keyword && Keyword.length != 0 && (
                <div className="suggestion" id="keywords">
                    <h3>Keywords</h3>
                    <ul id="list-keywords">
                        {Keyword.slice(0, 15).map(keyword => (
                            <li
                                className="suggestion-item"
                                key={keyword}
                                onClick={e => {
                                    findMusic(e, e.target.textContent);
                                    setQuery(e.target.textContent);
                                }}
                            >
                                {keyword}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Albums */}
            {Alben && Alben.length != 0 && (
                <div className="suggestion" id="albums">
                    <h3>Albums</h3>
                    <ul id="list-albums">
                        {Alben.slice(0, 15).map(album => (
                            <li
                                className="suggestion-item"
                                key={album}
                                onClick={e => {
                                    findMusic(e, e.target.textContent);
                                    setQuery(e.target.textContent);
                                }}
                            >
                                {album}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Instruments */}
            {Instrument && Instrument.length != 0 && (
                <div className="suggestion" id="instruments">
                    <h3>Instruments</h3>
                    <ul id="list-instruments">
                        {Instrument.slice(0, 15).map(inst => (
                            <li
                                className="suggestion-item"
                                key={inst}
                                onClick={e => {
                                    findMusic(e, e.target.textContent);
                                    setQuery(e.target.textContent);
                                }}
                            >
                                {inst}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {Style && Style.length != 0 && (
                <div className="suggestion" id="styles">
                    <h3>Styles</h3>
                    <ul id="list-styles">
                        {Style.slice(0, 15).map(style => (
                            <li
                                className="suggestion-item"
                                key={style}
                                onClick={e => {
                                    findMusic(e, e.target.textContent);
                                    setQuery(e.target.textContent);
                                }}
                            >
                                {style}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {ProductionType && ProductionType.length != 0 && (
                <div className="suggestion" id="production">
                    <h3>Production</h3>
                    <ul id="list-productions">
                        {ProductionType.slice(0, 15).map(prod => (
                            <li
                                className="suggestion-item"
                                key={prod}
                                onClick={e => {
                                    findMusic(e, e.target.textContent);
                                    setQuery(e.target.textContent);
                                }}
                            >
                                {prod}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

SearchSuggestions.propTypes = {
    Alben: PropTypes.array,
    Instrument: PropTypes.array,
    Keyword: PropTypes.array,
    ProductionType: PropTypes.array,
    Style: PropTypes.array,
};

export default SearchSuggestions;
