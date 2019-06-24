import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link } from "./lazy-wouter";

import "./styles.css";

function App() {
  return (
    <section>
      <nav>
        <Link to="/jquery">jquery</Link>
        <Link to="/lodash">lodash</Link>
        <Link to="/antd">antd</Link>
      </nav>

      <main>
        <center>
          <Router fallback="loading...">
            <Route path="/jquery" factory={() => import("./pages/jquery")} />
            <Route path="/lodash" factory={() => import("./pages/lodash")} />
            <Route path="/antd" factory={() => import("./pages/antd")} />
          </Router>
        </center>
      </main>
    </section>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
