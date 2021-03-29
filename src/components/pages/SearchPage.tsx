import React, { useContext, useEffect } from 'react';
import { ACTIONS } from '../service/constants';
import { AppContext } from '../service/context';
import { cutToken } from '../service/helpers';
import ArtistDeck from './search-items/ArtistDeck';
import SearchBar from './search-items/SearchBar';

const SearchPage: React.FC = () => {
    const { dispatch } = useContext(AppContext);

    useEffect(() => {
        const href = window.location.href;
        if (href.includes("access_token")) {
            dispatch({
                type: ACTIONS.SET_ACCESS_TOKEN,
                payload: cutToken(href)
            });
        };
    }, []);


    return (
        <div>
            <SearchBar/>
            <ArtistDeck/>
        </div>
    );
};

export default SearchPage;