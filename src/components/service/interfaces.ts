import React from "react";

export interface Action {
    type: string,
    payload: any
}

export interface basicKeyObj {
    [key: string]: any  
}



// Artist ---------------------------------------
export interface SpotifyImg {
    height: number | undefined,
    url: string | undefined,
    width: number | undefined
}

export interface Artist {
    external_urls: basicKeyObj,
    followers: basicKeyObj,
    genres: string[],
    href: string,
    id: string,
    images: SpotifyImg[] | [],
    name: string,
    type: string,
    uri: string,
    popularity: number
}

export interface ArtistProps extends Artist {
    isLast?: boolean,
    incOffset?: () => void
}



// Album ---------------------------------------
export interface AlbumArtist {
    external_urls: basicKeyObj,
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string
}
export interface Album {
    album_group: string,
    album_type: string,
    artists: AlbumArtist[],
    available_markets: string[],
    external_urls: basicKeyObj,
    href: string,
    id: string,
    images: SpotifyImg[] | [],
    name: string,
    release_date: string,
    release_date_precision: string,
    total_tracks: number,
    type: string,
    uri: string
}

export interface AlbumProps extends Album {
    isLast?: boolean,
    incOffset?: () => void
}
