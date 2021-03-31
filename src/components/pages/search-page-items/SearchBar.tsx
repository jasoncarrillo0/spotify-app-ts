import React, { ChangeEvent, useContext, useState, useRef, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { ACTIONS } from '../../service/constants';
import { Redirect, useLocation } from 'react-router';
import { AppContext } from '../../service/context';
import debounce from 'lodash.debounce'
import { useHistory } from 'react-router';
import s from './SearchBar.module.scss';

const SearchBar: React.FC = () => {
    const searchInputRef        = useRef<string | null>(null);
    const [searchInput, setSearchInput] = useState<string>("");
    const inputRef              = useRef<any>(null);
    const { state, dispatch }   = useContext(AppContext);
    const [stateLoaded, setStateLoaded] = useState<boolean>(true);
    const history               = useHistory();
    const location              = useLocation();
    const delayedQuery          = useRef(debounce( (q) => searchAndNavigate(q), 500)).current;

    // handle 3 scenarios: 1st arrival at /search, new search, and coming back from albums
    
    useEffect(() => {
        if (!state.accessToken) {

        }
    }, [state.accessToken])

    useEffect(() => {
        const urlArray = location.pathname.split('/');
        const param    = urlArray[urlArray.length - 1];
        const len      = urlArray.length;
        if (param !== 'search' && len === 3) { // avoids first arrival at /search, and first search entry
            if (param !== state.search) {
                setSearchInput(param);
            } else {
                setSearchInput(state.search);
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }
        }
    }, [history.location.pathname])

    function searchAndNavigate(q: string) {

        // handle navigating back from album page;
        // should only update when currently on the search page

        dispatch({
            type: ACTIONS.SET_SEARCH,
            payload: searchInputRef.current
        });
        dispatch({
            type: ACTIONS.SET_PREV_LOCATION,
            payload: '/search' + searchInputRef.current
        })

        if (q) { // must be a search; navigating back in browser produces no search and pushes "/"
            const newPath = q.replace(/ /g, '-');
            const fullPath = `/search/${newPath}`;
            dispatch({ type: ACTIONS.SET_PREV_LOCATION, payload: history.location.pathname});
            history.push({
                pathname: fullPath,
                state: {
                    from: history.location.pathname
                }
            });
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let { value } = e.target;
        setSearchInput(value);
    }

    useEffect(() => {
        // coming from albums page
        if (state.prevLocation.includes('albums')) {
            searchInputRef.current = state.search;
            delayedQuery(state.search);
        } else {
            searchInputRef.current = searchInput;
            delayedQuery(searchInput);
        }
    }, [searchInput])

    return (
            <div className={s.wrap}>
                <Input
                    placeholder="search artists..."
                    value={searchInput}
                    onChange={handleChange}
                    name="search"
                    className={s.searchBar}
                    ref={inputRef}
                />
            </div>
    );
};

export default SearchBar;