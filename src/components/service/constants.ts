import { Action } from './interfaces'
import { InitialStateType } from './types'
const REQUEST_STRING = "https://accounts.spotify.com/authorize?client_id=53e524bb7e4e45db9a0ccb031ea81aaa&response_type=token&redirect_uri=http://localhost:3000/search"
const RESULTS_LIMIT  = 15;
const REQ_LIMIT      = 10;
const ACTIONS        = {
    SET_ACCESS_TOKEN: "SET_ACCESS_TOKEN",
    SET_THEME: "SET_THEME",
    SET_PREV_LOCATION: "SET_PREV_LOCATION",
    SET_SEARCH: "SET_SEARCH",
    SET_ARTIST_ID: "SET_ARTIST_ID"
}

const appReducer = (state: InitialStateType, action: Action) => {
    switch (action.type) {
        case ACTIONS.SET_SEARCH:
            return {
                ...state,
                search: action.payload
            }
        case ACTIONS.SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload
            }
        case ACTIONS.SET_THEME:
            return {
                ...state,
                theme: action.payload
            }
        case ACTIONS.SET_PREV_LOCATION:
            return {
                ...state,
                prevLocation: action.payload
            }
        case ACTIONS.SET_ARTIST_ID:
            return {
                ...state,
                artistId: action.payload
            }
        default:
            return {
                ...state
            }
    }
}



export { 
    appReducer, 
    REQUEST_STRING, 
    ACTIONS,
    REQ_LIMIT, RESULTS_LIMIT
}