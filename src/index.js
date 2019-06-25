import React, { useCallback } from "react";
import ReactDOM from "react-dom";

import { Router } from "wouter";
import useLocation from "wouter/use-location";
import { LazySwitch, Route, Link } from "./lazy-wouter";

import "./styles.css";

const isProd = process.env.NODE_ENV === "production";

const makeUseBasepathLocation = basepath => () => {
  const [location, setLocation] = useLocation();

  // could be done with regexp, but requires proper escaping
  const normalized = location.startsWith(basepath)
    ? location.slice(basepath.length)
    : location;

  const setter = useCallback(to => setLocation(basepath + to), [
    basepath,
    setLocation
  ]);

  return [normalized, setter];
};

const useBasepathLocation = makeUseBasepathLocation(
  isProd ? "/wouter-async-routes" : ""
);

function App() {
  return (
    <Router hook={useBasepathLocation}>
      <section>
        <nav>
          <Link to="/jquery">jquery</Link>
          <Link to="/lodash">lodash</Link>
          <Link to="/antd">antd</Link>
        </nav>

        <main>
          <center>
            <LazySwitch fallback="loading...">
              <Route path="/jquery" factory={() => import("./pages/jquery")} />
              <Route path="/lodash" factory={() => import("./pages/lodash")} />
              <Route path="/antd" factory={() => import("./pages/antd")} />
            </LazySwitch>
          </center>
        </main>
      </section>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
