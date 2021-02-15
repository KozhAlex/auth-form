import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {NotificationPage} from './pages/NotificationPage';
import {AuthPage} from './pages/AuthPage';

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/notification" exact>
                    <NotificationPage/>
                </Route>
                <Redirect to="/notification"/>
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path="/auth" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/auth"/>
        </Switch>
    );
};
