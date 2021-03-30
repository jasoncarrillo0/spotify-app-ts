import { useEffect, useState, RefObject } from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { AlbumArtist, SpotifyImg } from './interfaces'
import notFoundUrl from '../../assets/not-found.png';
export function cutToken(token: string) {
    return token.split("=")[1].split("&")[0];
}

export function getFullArtistReq(search: string, accessToken: string, resultsPerPage: number, offset: number) {
    return "https://api.spotify.com/v1/search?q=" + search.replace(/ /g, "+") + "&type=artist&access_token=" + accessToken + "&limit=" + resultsPerPage.toString() + "&offset=" + offset.toString();
}

export const getFullAlbumReq = (id: string, accessToken: string, resultLimit: number, offset: number) => {
    return "https://api.spotify.com/v1/artists/" + id  + "/albums?&access_token=" + accessToken + "&limit=" + resultLimit.toString() + "&offset=" + offset.toString();
}


interface Args extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
    elementRef: RefObject<Element>,
    {
        threshold = 0,
        root = null,
        rootMargin = "0%",
        freezeOnceVisible = false,
    }: Args
): IntersectionObserverEntry | undefined {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    const frozen = entry?.isIntersecting && freezeOnceVisible;

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry);
    };

    useEffect(() => {
        const node = elementRef?.current; // DOM Ref
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || frozen || !node) return;

        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementRef, threshold, root, rootMargin, frozen]);

    return entry;
}


export function returnStarIcons(popularity : number) {
    if (popularity < 21) {
        return <span><StarIcon/><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/></span>
    } else if (popularity < 41) {
        return <span><StarIcon/><StarIcon/><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/></span>
    } else if (popularity < 61) {
        return <span><StarIcon/><StarIcon/><StarIcon/><StarBorderIcon/><StarBorderIcon/></span>
    } else if (popularity < 81) {
        return <span><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarBorderIcon/></span>
    } else {
        return <span><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></span>
    }
}

// set font size based on length of artist name (album card)
export function returnArtistStyle(string: string) {
    let count = string.length;
    if (count < 21) {
        return {marginBottom: "5px"}
    }
    else if (count > 60) {
        return {
            fontSize: "8px", 
            display: "-webkit-box",
            '-webkit-box-orient': "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden"
        }
    }
    else if (count > 50) {
        return {
            marginBottom: "0px",
            fontSize: "9px"
        }
    }
}


export function returnTitleStyle(string: string) {
    let count = string.length;
    if (count > 60) {
        return {
            fontSize: "10px", 
            display: "-webkit-box",
            '-webkit-box-orient': "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden"
        }
    }
    else if (count > 40) {return {fontSize: "9px"}}
    else if (count > 30) { return {fontSize: "11px"}}
    else if (count > 20) {return {fontSize: "12px"}}
    else {return {fontSize: "13px"}}
}

// takes in an array of "artist" objects and returns a string of all the artists in array
export function returnArtistsString(arrOfObjects: AlbumArtist[]){
    let fullString = "";
    if (arrOfObjects.length) {
        arrOfObjects.forEach((obj) => {
            if (fullString.length === 0) {
                fullString = obj.name;
            } else {
                fullString += (", " + obj.name);
            }
        });
    }
    return fullString;
}

// handles getting a pic if there is none in the array; if none, use local fill pic
export const returnAlbumPicUrl = (arrOfObjects: SpotifyImg[]) => {
    if (arrOfObjects.length) {
        if (arrOfObjects[0]) {
            return arrOfObjects[0].url;
        }
        else if (arrOfObjects[1]) {
            return arrOfObjects[1].url;
        }
        else if (arrOfObjects[2]) {
            return arrOfObjects[2].url;
        }
    }
    return notFoundUrl;
}
