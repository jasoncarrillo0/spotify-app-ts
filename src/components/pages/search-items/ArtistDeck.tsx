import React, { useState, useRef, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { AppContext } from '../../service/context';
import { getFullArtistReq, useIntersectionObserver } from '../../service/helpers';
import { basicKeyObj } from '../../service/interfaces';
import ArtistCard from './ArtistCard';
import s from './ArtistDeck.module.scss';
const ArtistDeck: React.FC = () => {
    const { state }                           = useContext(AppContext);
    const [artists, setArtists]               = useState<basicKeyObj[]>([]);
    const [error, setError]                   = useState<boolean>(false);
    const [isLoading, setIsLoading]           = useState<boolean>(false);
    const [hasMoreArtists, setHasMoreArtists] = useState<boolean>(false);
    const [offset, setOffset]                 = useState<number>(0);
    const RESULTS_LIMIT                       = 15;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const currSearch = state.search.replace(/ /g, '-');
            if (currSearch) {
                try {
                    let reqWithOffset = getFullArtistReq(currSearch, state.accessToken, RESULTS_LIMIT) + "&offset=" + offset.toString();
                    reqWithOffset = reqWithOffset.replace('undefined','');
                    const res = await fetch(reqWithOffset);
                    const json = await res.json();
    
                    setArtists((prevArtists: basicKeyObj[]) => {
                        if (prevArtists.length > 0) {
                            let firstName = prevArtists[0].name.toLowerCase();
                            if (firstName.includes(currSearch.toLowerCase())) {
                                return [...new Set([...prevArtists, ...json.artists.items])];
                            }
                            else {
                                return json.artists.items;
                            }
                        }
                        else {
                            return json.artists.items;
                        }
                    });
                    if (json.artists.next) { setHasMoreArtists(true)}
                    else {setHasMoreArtists(false)}                              
                    setIsLoading(false)
                }
                catch (error) {
                    setError(error);
                }
    
            }
        };
        console.log("FETching data")
        fetchData();
    }, [offset, state.search]);
    

    return (
        <div className={s.wrapper}>
            {
                !isLoading || !error ? (
                    artists.map((artist, idx) => {
                        // if (artists.length === idx + 1) {
                        //     return (
                        //         <ArtistCard 
                        //             key={idx} 
                        //             {...artist}
                        //         />
                        //     )
                        // } else {
                        //    return (
                        //         <ArtistCard
                        //             key={idx} 
                        //             {...artist}
                        //         />
                        //    )
                        // }
                        return idx + 1 === artists.length ? (
                            <ArtistCard key={idx} {...artist} isLast={true}/>
                        ) : (
                            <ArtistCard key={idx} {...artist}/>
                        )
                    }
                )) : (null)
            }
            {
                isLoading ? <div>Loading...</div> : null
            }
        </div>
    )
}
export default ArtistDeck;