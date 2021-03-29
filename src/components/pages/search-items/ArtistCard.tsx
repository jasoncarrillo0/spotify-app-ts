import React, { forwardRef, useRef } from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import { returnStarIcons, useIntersectionObserver } from '../../service/helpers';
import { basicKeyObj } from '../../service/interfaces';
import s from './ArtistCard.module.scss';

// for some reason the forwardRef <> args are opposite the function
const ArtistCard: React.FC<basicKeyObj> = (props) => {

    // needed for use in forwardRef
    let { url } = useRouteMatch();
    const linkStyles = {
        textDecoration: 'none',
        color: 'unset'
    }

    const ref = useRef<HTMLDivElement | null>(null)
    const entry = useIntersectionObserver(ref, {})
    const isVisible = !!entry?.isIntersecting
    if (isVisible) console.log("FIREDDEEDSASFAS")

    return (
        <Link to={`${url}/` + props.name.replace(/ /g, '-') + "/albums"} style={linkStyles}>
            <div ref={props.isLast ? ref : null} className={s.artistCard}>
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
};
    

export default ArtistCard;