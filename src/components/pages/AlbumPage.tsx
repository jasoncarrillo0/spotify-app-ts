import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { AppContext } from '../service/context';
import AlbumDeck from './album-page-items/AlbumDeck';

const AlbumPage: React.FC = () => {
    const { state } = useContext(AppContext);
    
    if (!state.accessToken) {
        return <Redirect to='/'/>
    }
    return (
        <div>
            <AlbumDeck/>
        </div>
    );
};

export default AlbumPage;