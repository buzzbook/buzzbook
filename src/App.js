import React from "react";
import {Switch, Route} from "react-router-dom";
import $ from 'jquery';

import "./css/App.css";
import Nav from "./components/Nav";
import Controls from "./components/settings/Controls";
import {SettingsContextProvider} from "./components/settings/SettingsContext";

// Nav Pages
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Grades from "./pages/Grades";
import Enrollment from "./pages/Enrollment";
import Scheduler from "./pages/Scheduler";
import Ratings from "./pages/Ratings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const navPages = [
	{component: Catalog, path: "/catalog/"},
	{component: Grades, path: "/grades/"},
	{component: Enrollment, path: "/enrollment/"},
	{component: Scheduler, path: "/scheduler/"},
	{component: Ratings, path: "/ratings/"},
	{component: About, path: "/about/"}
];

$(window).on('load', function() {
  $("html").removeClass("preload");
});

function App({location}) {
	return (
		<>
			<SettingsContextProvider>
				<div class="grid-main pad-h__8">
					<div className="">
						<Nav />
					</div>
					<div className="">
						<Switch location={location}>
							<Route exact path="/" component={Home} />

							{navPages.map((page, index) => (
								<Route
									// exact
									path={page.path}
									component={page.component}
									key={index}
								/>
							))}
							<Route path="" component={NotFound} />
						</Switch>
					</div>
				</div>
				<Controls />
			</SettingsContextProvider>
		</>
	);
}

export default App;
