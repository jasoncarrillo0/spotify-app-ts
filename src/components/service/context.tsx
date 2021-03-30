import React, { useReducer } from 'react'
import { appReducer } from './constants'
import { InitialStateType } from './types'



const INITIAL_STATE = {
    accessToken: "",
    theme: "",
    prevLocation: "",
    search: "",
    artistId: ""
}

const AppContext = React.createContext
    <{state: InitialStateType, dispatch: React.Dispatch<any>}>
    ({ state: INITIAL_STATE, dispatch: () => null});


/*
https://hswolff.com/blog/how-to-usecontext-with-usereducer/
make sure to test: will components re-render w/ state changes? test it

*/

// wraps the App
const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);


    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
};

export { ContextProvider, AppContext };