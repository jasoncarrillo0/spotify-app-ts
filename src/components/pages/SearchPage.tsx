import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { ACTIONS } from '../service/constants';
import { AppContext } from '../service/context';
import { cutToken } from '../service/helpers';
import ArtistDeck from './search-page-items/ArtistDeck';
import SearchBar from './search-page-items/SearchBar';

const SearchPage: React.FC = () => {

    const { state,dispatch } = useContext(AppContext);
    const href = window.location.href;
    console.log(state);
    if (href.includes("access_token") && !state.accessToken) {
        dispatch({
            type: ACTIONS.SET_ACCESS_TOKEN,
            payload: cutToken(href)
        });
    } else if (!state.accessToken) {
        return <Redirect to="/"/>
    }


    return (
        <div>
            <SearchBar/>
            <ArtistDeck/>
        </div>
    );
};

export default SearchPage;