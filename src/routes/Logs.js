import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
const ErrorNotFound = lazy(() => import("views/Placeholders/ErrorNotFound"));
const LogsList = lazy(() => import("views/Logs/LogsList"));
const SingleLog = lazy(() => import("views/Logs/SingleLog"));

function Feedbacks(props) {
    return (
        <Switch>
            <Route path="/logs/:id" component={SingleLog} />
            <Route path="/logs" component={LogsList} />
            <Route component={ErrorNotFound} />
        </Switch>
    );
}

export default Feedbacks;
