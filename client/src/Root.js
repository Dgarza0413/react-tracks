import React from "react";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import withRoot from "./withRoot";
import App from './pages/App';
import Profile from './pages/Profile';
import Header from './components/Shared/Header';

const Root = () => (
    <Query query={GET_TRACKS_QUERY}>
        {({ data, loading, error }) => {
            if (loading) return <div>loading</div>
            if (error) return <div>Error</div>

            return (
                <Router>
                    <>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={App} />
                            <Route path="/profile/:id" component={Profile} />
                        </Switch>
                    </>
                </Router>
            )
        }}
    </Query>
);

const GET_TRACKS_QUERY = gql`
{
    tracks{
        id
        title
        description
        url
    }
}
`

export default withRoot(Root);
