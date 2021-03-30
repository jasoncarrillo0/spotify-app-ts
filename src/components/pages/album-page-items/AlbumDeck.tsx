import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { updateNonNullChain } from 'typescript';
import { AppContext } from '../../service/context';
import { getFullAlbumReq } from '../../service/helpers';
import { Album } from '../../service/interfaces';
import AlbumCard from './AlbumCard';
import s from './AlbumDeck.module.scss';

const AlbumDeck: React.FC = () => {
    const { state, dispatch }                 = useContext(AppContext);
    const location                            = useLocation();
    const [albums, setAlbums]                 = useState<Album[]>([]);
    const [error, setError]                   = useState<boolean>(false);
    const [isLoading, setIsLoading]           = useState<boolean>(false);
    const [hasMoreAlbums, setHasMoreAlbums]   = useState<boolean>(false);
    const [offset, setOffset]                 = useState<number>(0);
    const RESULTS_LIMIT                       = 15;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let reqWithOffset = getFullAlbumReq(state.artistId, state.accessToken, RESULTS_LIMIT, offset);
                reqWithOffset     = reqWithOffset.replace('undefined','');
                console.log(reqWithOffset);
                const res         = await fetch(reqWithOffset);
                const json        = await res.json();
                console.log(json);
                setAlbums((prevAlbums: Album[]) => {
                    if (prevAlbums.length > 0) {
                        let firstName = prevAlbums[0].name.toLowerCase();
                        // if (firstName.includes(search.toLowerCase())) {
                        //     return [...new Set([...prevAlbums, ...json.items])];
                        // }
                        // else {
                        //     return json.items;
                        // }
                    }
                    else {
                        return json.items;
                    }
                    
                });
                if (json.next) { setHasMoreAlbums(true)}
                else {setHasMoreAlbums(false)}                              
                setIsLoading(false)
            }
            catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [offset, location]);
    return (
        <div className={s.wrapper}>
        {
            albums.length > 0 && hasMoreAlbums ? (
                albums.map((album, idx) => {
                    return idx + 1 === albums.length ? (
                        <AlbumCard
                            key={idx}
                            isLast={true}
                            incOffset={() => setOffset(prevOffset => prevOffset + 10)}
                            {...album}
                        />
                    ) : (
                        <AlbumCard key={idx} {...album}/>
                    )
                })
            ) : (null)
        }
        {
            !hasMoreAlbums ? (
                albums.map((album, idx) => <AlbumCard key={idx} {...album}/>)
            ) : (null)
        }
        {
            isLoading ? (
                <div>Loading...</div>
            ) : (null)
        }
        </div>
    );
};

export default AlbumDeck;