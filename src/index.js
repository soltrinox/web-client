import React from "react";
import ReactDOM from "react-dom";
import App from "./components/core/App";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free-webfonts/css/fa-solid.css";
import "@fortawesome/fontawesome-free-webfonts/css/fontawesome.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
