import React, { useRef, useEffect } from 'react';
import { returnAlbumPicUrl, returnArtistsString, returnArtistStyle, returnTitleStyle, useIntersectionObserver } from '../../service/helpers';
import { AlbumProps } from '../../service/interfaces';
import s from './AlbumCard.module.scss';

const AlbumCard: React.FC<AlbumProps> = (props) => {

    const ref       = useRef<HTMLDivElement | null>(null)
    const entry     = useIntersectionObserver(ref, {})
    const isVisible = !!entry?.isIntersecting
    
    useEffect(() => {
        if (isVisible && props.isLast) {
            if (props.incOffset) {
                props.incOffset();
            }
        }
    }, [isVisible]);

    const artistsString = returnArtistsString(props.artists);
    return (
        <div ref={props.isLast ? ref : null} className={s.albumCard}>
            <div className={s.albumImgWrapper}>
                <img src={returnAlbumPicUrl(props.images)} className={s.albumImgTop} alt="album"/>
            </div>
            <div className={s.infoSection}>
                <span className={s.albumTitle} style={returnTitleStyle(props.name)}>{props.name}</span>
                <div className={s.albumDetails}>
                    <p className={s.albumArtist} style={returnArtistStyle(artistsString)}>{artistsString}</p>
                    <p>{props.release_date}</p>
                    <p>{props.total_tracks > 1 ? props.total_tracks + " tracks" : props.total_tracks + " track"}</p>
                </div>
            </div>
            <div className={s.previewLink}>
                <a href={props.external_urls.spotify} rel="noopener noreferrer" target="_blank">Preview On Spotify</a>
            </div>
        </div>
    );
};

export default AlbumCard;