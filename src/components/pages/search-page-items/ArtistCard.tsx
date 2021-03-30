import React, { useRef, useEffect, useContext } from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import { ACTIONS } from '../../service/constants';
import { AppContext } from '../../service/context';
import { returnStarIcons, useIntersectionObserver } from '../../service/helpers';
import { Artist, ArtistProps } from '../../service/interfaces';
import s from './ArtistCard.module.scss';



const ArtistCard: React.FC<ArtistProps> = (props) => {
    const { dispatch } = useContext(AppContext);

    // needed for use in forwardRef
    let { url } = useRouteMatch();

    const fullUrl = `${url}/` + props.name.replace(/ /g, '-') + '/albums';
    const linkStyles = {
        textDecoration: 'none',
        color: 'unset'
    }

    const ref = useRef<HTMLDivElement | null>(null)
    const entry = useIntersectionObserver(ref, {})
    const isVisible = !!entry?.isIntersecting
    useEffect(() => {
        if (isVisible && props.isLast) {
            if (props.incOffset) {
                props.incOffset();
            }
        }
    }, [isVisible])

    function handleClick() {
        dispatch({
            type: ACTIONS.SET_PREV_LOCATION,
            payload: fullUrl
        });
        dispatch({
            type: ACTIONS.SET_ARTIST_ID,
            payload: props.id
        });
    }

    return (
        <Link to={fullUrl} onClick={handleClick} style={linkStyles}>
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