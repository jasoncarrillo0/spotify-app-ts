import React, { ChangeEvent, useContext, useState, useRef, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { ACTIONS } from '../../service/constants';
import { AppContext } from '../../service/context';
import s from './SearchBar.module.scss';
import debounce from 'lodash.debounce'
import { useHistory, useLocation } from 'react-router';

const SearchBar: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { state, dispatch }   = useContext(AppContext);
    const history               = useHistory();
    const location              = useLocation();
    const delayedQuery          = useRef(debounce( (q) => searchAndNavigate(q), 500)).current;

    function searchAndNavigate(q: string) {
        if (q) { // must be a search; navigating back in browser produces no search and pushes "/"
            const newPath = q.replace(/ /g, '-');
            const fullPath = `${location.pathname}/${newPath}`;
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
        dispatch({
            type: ACTIONS.SET_SEARCH,
            payload: value
        });
    }

    useEffect(() => {
        delayedQuery(state.search);
    }, [state.search])

    return (
        <div className={s.wrap}>
            <Input
                placeholder="search artists..."
                loading={loading}
                value={state.search}
                onChange={handleChange}
                name="search"
                className={s.searchBar}
            />
        </div>
    );
};

export default SearchBar;