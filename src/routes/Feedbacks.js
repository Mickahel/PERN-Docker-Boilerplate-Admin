import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import ErrorNotFound from "views/Placeholders/ErrorNotFound";
const FeedbacksList = lazy(() => import("views/Feedbacks/FeedbacksList"));
const FeedbackForm = lazy(() => import("views/Feedbacks/FeedbackForm"));

function Feedbacks(props) {
    return (
        <Switch>
            <Route path="/feedbacks/:id" component={FeedbackForm} />
            <Route path="/feedbacks" component={FeedbacksList} />
            <Route component={ErrorNotFound} />
        </Switch>
    );
}

export default Feedbacks;
