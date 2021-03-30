import React from 'react';
import { returnAlbumPicUrl, returnArtistsString, returnArtistStyle, returnTitleStyle } from '../../service/helpers';
import { AlbumProps } from '../../service/interfaces';
import s from './AlbumCard.module.scss';

const AlbumCard: React.FC<AlbumProps> = (props) => {
    console.log(props);
    const artistsString = returnArtistsString(props.artists);
    return (
        <div className={s.albumCard}>
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