import { useEffect, useState, RefObject } from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

export function cutToken(token: string) {
    return token.split("=")[1].split("&")[0];
}

export function getFullArtistReq(search: string, accessToken: string, resultsPerPage: number) {
    return "https://api.spotify.com/v1/search?q=" + search.replace(/ /g, "+") + "&type=artist&access_token=" + accessToken + "&limit=" + resultsPerPage.toString();
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