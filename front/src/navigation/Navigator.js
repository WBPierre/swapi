import React from "react";
import * as Routes from "./Routes";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../views/Home";
import Details from "../views/Details";
import Explorer from "../views/Explorer";


function Navigator(){

    return(
        <Router>
            <Switch>
                <Route exact path={Routes.HOME} component={Home} />
                <Route exact path={Routes.EXPLORER} component={Explorer} />
                <Route exact path={Routes.DETAILS} component={Details}/>
            </Switch>
        </Router>
    )
}

export default Navigator;
