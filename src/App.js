import React from "react";
import {Switch, Route} from "react-router-dom";

import "./css/App.css";
import Navbar from "./components/Navbar";

// Nav Pages
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Grades from "./pages/Grades";
import Enrollment from "./pages/Enrollment";
import Scheduler from "./pages/Scheduler";
import Ratings from "./pages/Ratings";
import About from "./pages/About";

const navPages = [
	{component: Catalog, path: "/catalog/"},
	{component: Grades, path: "/grades/"},
	{component: Enrollment, path: "/enrollment/"},
	{component: Scheduler, path: "/scheduler/"},
	{component: Ratings, path: "/ratings/"},
	{component: About, path: "/about/"}
];

function App({location}) {
	return (
		<div>
			<Navbar />
			<div>
				<Switch location={location}>
					<Route exact path="/" component={Home} />

					{navPages.map(page => (
						<Route exact path={page.path} component={page.component} />
					))}
				</Switch>
			</div>
		</div>
	);
}

export default App;
