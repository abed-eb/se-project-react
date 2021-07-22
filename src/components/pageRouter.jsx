import React, { Component } from "react";
import Nav_bar from "./homepage/navbar/navbar";
import Footer from "./homepage/footer";
import { Route, Switch } from "react-router-dom";
import SearchUser from "./homepage/searchUser/searchUser";
import Settings from "./settings/settings";
import Hosting from "./hosting/hosting";
import Homepage from "./homepage/homepage";
import VillaProfile from "./villa/villaProfile/villaProfile";
import SlideShow from "./villa/villaProfile/slideShow/sildeShow";
import Reserve from "./villa/reservation/reserve";
import SearchPage from "./searchpage/searchPage";

class PageRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"d-flex flex-column"}>
        <Nav_bar />
        <Switch>
          <Route path="/settings/">
            <Settings />
          </Route>
          <Route path="/hosting/">
            <Hosting />
          </Route>
          <Route path="/villa/villaProfile/">
            <VillaProfile />
          </Route>
          <Route path="/search/">
            <SearchPage />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default PageRouter;
