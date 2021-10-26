import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Profile } from "./pages/profile/profile";
import { AlertState } from "./context/alert/alert-state";
import { GithubState } from "./context/github/github-state";

function App() {
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile/:name" component={Profile} />
          </Switch>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
}

export default App;
