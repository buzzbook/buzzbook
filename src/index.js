import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import "./scripts/courses";
import store from "./redux/store.js";
import "bootstrap/dist/css/bootstrap.min.css";

import "jquery";
import "popper.js";
import "bootstrap";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
//import "./css/reset.css"; will need to rework some default modifiers
import "./css/index.scss";

ReactDOM.render(
	<Provider store={store}>
		<Router basename="/">
			<App />
		</Router>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
