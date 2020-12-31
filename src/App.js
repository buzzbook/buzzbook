import React from "react";
import {Switch, Route} from "react-router-dom";
import $ from 'jquery';

import "./css/App.css";
import Nav from "./components/Nav";
import Controls from "./components/settings/Controls";

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

// var originalSetItem = localStorage.setItem;
// localStorage.setItem = function(){
//     document.createEvent('Event').initEvent('itemInserted', true, true);
//     originalSetItem.apply(this, arguments);
// }

function App({location}) {
	return (
		<>
			<div style={{display: "grid", gridTemplateColumns: "180px 1fr"}}>
				<div className="pr-0" style={{maxWidth: 180}}>
					<Nav />
				</div>
				<div className="px-0">
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
		</>
	);
}

export default App;
