import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../service/context';
import { getFullArtistReq } from '../../service/helpers';
import { Artist } from '../../service/interfaces';
import ArtistCard from './ArtistCard';
import s from './ArtistDeck.module.scss';

const ArtistDeck: React.FC = () => {
    const { state }                           = useContext(AppContext);
    const [artists, setArtists]               = useState<Artist[]>([]);
    const [error, setError]                   = useState<boolean>(false);
    const [isLoading, setIsLoading]           = useState<boolean>(false);
    const [hasMoreArtists, setHasMoreArtists] = useState<boolean>(false);
    const [offset, setOffset]                 = useState<number>(0);
    const RESULTS_LIMIT                       = 15;

    useEffect(() => {
        const fetchData = async () => {
            const currSearch = state.search.replace(/ /g, '-');
            if (currSearch) {
                try {
                    let reqWithOffset = getFullArtistReq(currSearch, state.accessToken, RESULTS_LIMIT, offset);
                    reqWithOffset     = reqWithOffset.replace('undefined','');
                    const res         = await fetch(reqWithOffset);
                    const json        = await res.json();
    
                    setArtists((prevArtists: Artist[]) => {
                        if (prevArtists.length > 0) {
                            let firstName = prevArtists[0].name.toLowerCase();
                            if (firstName.includes(currSearch.toLowerCase())) {
                                return [...new Set([...prevArtists, ...json.artists.items])];
                            }
                            else {
                                return [...json.artists.items];
                            }
                        }
                        else {
                            return json.artists.items;
                        }
                    });
                    if (json.artists.next) { setHasMoreArtists(true) }
                    else {setHasMoreArtists(false)}                              
                    setIsLoading(false)
                }
                catch (error) {
                    setError(error);
                }
            } else {
                setArtists([]);
                setIsLoading(false);
                setOffset(0);
            }
        };
        fetchData();
    }, [offset, state.search]);

    useEffect(() => {
        if (state.search) {
            setIsLoading(true);
        }
    }, [state.search]);
    

    return (
        <div className={s.wrapper}>
            {
                artists.length > 0 && !isLoading && !error && hasMoreArtists ? (
                    artists.map((artist, idx) => {
                        return idx + 1 === artists.length ? (
                            <ArtistCard 
                                key={idx} {...artist} 
                                isLast={true} 
                                incOffset={() => setOffset(prevOffset => prevOffset + 15)}
                            />
                        ) : (
                            <ArtistCard key={idx} {...artist}/>
                        )
                    }
                )) : (null)
            }
            {
                !hasMoreArtists ? (
                    artists.map((artist, idx) => {
                        return <ArtistCard key={idx} {...artist}/>
                    })
                ) : (null)
            }
            {
                isLoading ? <div>Loading...</div> : null
            }
        </div>
    )
}
export default ArtistDeck;