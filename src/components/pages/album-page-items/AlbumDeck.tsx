import React, { useContext, useEffect, useState } from 'react';
import { REQ_LIMIT, RESULTS_LIMIT } from '../../service/constants';
import { AppContext } from '../../service/context';
import { getFullAlbumReq } from '../../service/helpers';
import { Album } from '../../service/interfaces';
import AlbumCard from './AlbumCard';
import s from './AlbumDeck.module.scss';

const AlbumDeck: React.FC = () => {
    const { state }                           = useContext(AppContext);
    const [albums, setAlbums]                 = useState<Album[] | []>([]);
    const [error, setError]                   = useState<boolean>(false);
    const [isLoading, setIsLoading]           = useState<boolean>(false);
    const [offset, setOffset]                 = useState<number>(0);
    const [reqCount, setReqCount]             = useState<number>(0);


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
                        return [...new Set([...prevAlbums, ...json.items])];
                    } else {
                        return json.items;
                    }
                });
                setReqCount(c => c + 1);
                setIsLoading(false)
            }
            catch (error) {
                setError(true);
            }
        }
        if (reqCount < REQ_LIMIT) fetchData();
    }, [offset]);

    return (
        <div className={s.wrapper}>
        {
            albums.map((album: Album, idx: number) => {
                return idx + 1 === albums.length ? (
                    <AlbumCard
                        key={idx}
                        isLast={true}
                        incOffset={() => setOffset(prevOffset => prevOffset + 15)}
                        {...album}
                    />
                ) : (
                    <AlbumCard key={idx} {...album}/>
                )
            })
        }
        {
            isLoading && <div>Loading...</div>
        }
        {
            error && <div>Error.</div>
        }
        </div>
    );
};

export default AlbumDeck;