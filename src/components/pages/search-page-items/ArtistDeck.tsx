import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import { ACTIONS, REQ_LIMIT, RESULTS_LIMIT } from '../../service/constants';
import { AppContext } from '../../service/context';
import { getFullArtistReq } from '../../service/helpers';
import { Artist } from '../../service/interfaces';
import ArtistCard from './ArtistCard';
import s from './ArtistDeck.module.scss';
const ArtistDeck: React.FC = () => {
    const { state, dispatch }                 = useContext(AppContext);
    const location                            = useLocation();
    const [artists, setArtists]               = useState<Artist[]>([]);
    const [error, setError]                   = useState<boolean>(false);
    const [isLoading, setIsLoading]           = useState<boolean>(false);
    const [showScrollCards, setShowScrollCards] = useState<boolean>(false);
    const [offset, setOffset]                 = useState<number>(0);
    const [reqCount, setReqCount]             = useState<number>(0);
    const msgStyles = {
        marginLeft: '42px',
        marginBottom: '2rem',
        width: '100%'
    }

    useEffect(() => {
        if (!isLoading && !error && artists.length > 0) {
            setShowScrollCards(true);
        } else {
            setShowScrollCards(false);
        }
    });

    useEffect(() => {
        let currSearch = state.search.replace(/ /g, '-');
        const fetchData = async () => {
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
                    setReqCount(c => c + 1);
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
        if (reqCount < REQ_LIMIT) {
            fetchData();
        }
    }, [offset, state.search]);

    useEffect(() => {
        if (state.search) {
            setIsLoading(true);
            setReqCount(0);
            setOffset(0);
        }
    }, [state.search]);
    

    return (
        <div className={s.wrapper}>
            {
                showScrollCards ? (
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
                isLoading ? <div style={msgStyles}>Loading...</div> : null
            }
            {
                error ? <div style={msgStyles}>Error.</div> : null
            }
            {
                reqCount === REQ_LIMIT && <div style={msgStyles}>Request limit reached for this search.</div>
            }
        </div>
    )
}
export default ArtistDeck;