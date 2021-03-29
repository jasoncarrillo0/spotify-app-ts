import React, { forwardRef } from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import { returnStarIcons } from '../../service/helpers';
import { basicKeyObj } from '../../service/interfaces';
import s from './ArtistCard.module.scss';

// for some reason the forwardRef <> args are opposite the function
const ArtistCard = forwardRef<HTMLDivElement | null, basicKeyObj>((props, ref) => {

    // needed for use in forwardRef
    let { url } = useRouteMatch();
    const linkStyles = {
        textDecoration: 'none',
        color: 'unset'
    }

    return (
        <Link to={`${url}/` + props.name.replace(/ /g, '-') + "/albums"} style={linkStyles}>
            <div ref={ref} className={s.artistCard}>
                <div className={s.artistImgWrapper}>
                    <img src={props.images[0] ? props.images[0].url : "/img/spotify-logo.png"} className={s.artistImgTop} alt="artist"/>
                </div>
                <div className={s.artistInfo}>
                    <span className={s.artistTitle}>{props.name}</span>
                    <p className={s.followerText}>{props.followers.total} followers</p>
                </div>
                <p className={s.artistRating}>{returnStarIcons(props.popularity)}</p>
            </div>
        </Link>
    )
});
    

export default ArtistCard;