import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {ChatPage} from "./pages/ChatPage";
import {ProfilePage} from "./pages/ProfilePage";
import {BusinessesPage} from "./pages/BusinessesPage";
import {AuthPage} from "./pages/AuthPage";
import {NewsPage} from "./pages/NewsPage";
import {IdeasPage} from "./pages/IdeasPage";
import {CompanyPage} from "./pages/CompanyPage";
import {CompletingTaskPage} from "./pages/CompletingTaskPage";
import {AssessmentAnswersPage} from "./pages/AssessmentAnswersPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path="/businesses" exact>
                    <BusinessesPage />
                </Route>
                <Route path="/chat" exact>
                    <ChatPage />
                </Route>
                <Route path="/news" exact>
                    <NewsPage />
                </Route>
                <Route path="/ideas" exact>
                    <IdeasPage />
                </Route>
                <Route path="/company/:id">
                    <CompanyPage />
                </Route>
                <Route path="/completing-task/:id">
                    <CompletingTaskPage />
                </Route>
                <Route path="/assessment-answers/:id">
                    <AssessmentAnswersPage />
                </Route>
                <Redirect to="/profile" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" >
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}