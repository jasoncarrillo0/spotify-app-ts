import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import s from './Header.module.scss';
import { AppContext } from './service/context';

const Header: React.FC = () => {
    const BASE_TITLE = "SPOTIFY SEARCH APP";
    const { state } = useContext(AppContext);
    const [title, setTitle] = useState<string | undefined>(BASE_TITLE);

    const location  = useLocation();

    useEffect(() => {
        let fill = '\xa0\xa0\xa0\>>\xa0\xa0\xa0';
        let newTitle;
        let searchStr = state.search.replace(/-/g, ' ');

        if (location.pathname.includes('albums')) {
            console.log(location.pathname);
            let name = location.pathname.split('/')[2].replace(/-/g, ' ').toUpperCase();
            newTitle = BASE_TITLE + fill + `${searchStr.toUpperCase()}` + fill + name + fill + 'ALBUMS';
            setTitle(newTitle);
        } else if (state.search) {
            newTitle = BASE_TITLE + fill + `${searchStr.toUpperCase()}`;
            setTitle(newTitle);
        } else if (location.pathname === '/') {
            setTitle(BASE_TITLE);
        }
    }, [location.pathname]);

    return (
        <div className={s.wrap}>
            <div>{title}</div>
        </div>
    );
};

export default Header;