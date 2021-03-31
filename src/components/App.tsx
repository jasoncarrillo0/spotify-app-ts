import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "semantic-ui-css/semantic.min.css";
import SearchPage from "./pages/SearchPage";
import AlbumPage from "./pages/AlbumPage";
import Header from "./Header";
import s from './App.module.scss';
const App: React.FC = () => {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route
                    exact
                    path="/search/:search/albums"
                    component={AlbumPage}
                />
                <Route path="/search" component={SearchPage} />
                <Route render={({ location }) => {
                    return (
                        <div className={s.notFound}>
                            <div>Whoops!</div>
                            <div>Nothing was found here.</div>        
                        </div>
                    )
                }}/>
            </Switch>
        </>
    );
};

export default App;
