import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { storeResponseAction } from '../redux/actions';
import SearchSuggestions from './SearchSuggestions';
import axios from 'axios';

const SearchContainer = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState(null);
    const [multilayer, setMultilayer] = useState(false);

    useEffect(() => {
        // Flag for throtteling api requests
        let ignore = false;

        async function getFilters() {
            // Don't make a request if there is no query.
            if (!query) {
                return;
            }

            // Get data from API, set to state
            const {
                data: { filters },
            } = await axios.get(
                `http://api.createmusic.com/search?search=${query}&mutliLayerOnly=${multilayer}`
            );
            if (!ignore) {
                setFilters(filters);
            }
        }

        getFilters();

        return () => {
            // when user types a new letter, ignore the previous request.
            ignore = true;
        };
    }, [query, multilayer]);

    // find music and dispatch it to store
    const findMusic = async (e, filterItem) => {
        e.preventDefault();

        // If no filter item is clicked, use the typed-in query
        if (!filterItem) {
            filterItem = query;
        }

        // get Data
        const { data } = await axios.get(
            `http://api.createmusic.com/search?search=${filterItem}&mutliLayerOnly=${multilayer}`
        );
        if (data) {
            console.log(data);
            dispatch(storeResponseAction(data));
        }
    };

    return (
        <aside className="container-search">
            <div className="search-tool">
                <h3>Search Music</h3>
                <form id="search-form" onSubmit={findMusic}>
                    <input
                        autocomplete="off"
                        type="text"
                        id="search-input"
                        value={query}
                        onChange={e => {
                            setQuery(e.target.value);
                        }}
                    />
                    <label for="multilayer" className="checkbox-label">
                        <input
                            type="checkbox"
                            name="multilayer"
                            id="multilayer"
                            onChange={e => {
                                // Set multilayer flag upon clicking
                                const mutliLayerFlag = e.target.checked ? 1 : 0;
                                setMultilayer(mutliLayerFlag);
                            }}
                        />
                        <span className="checkbox"></span>
                        Multilayer
                    </label>
                    {filters && (
                        <SearchSuggestions
                            filters={filters}
                            findMusic={findMusic}
                            setQuery={setQuery}
                        />
                    )}
                </form>
            </div>
        </aside>
    );
};

export default SearchContainer;
