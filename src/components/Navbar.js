import React from "react";
import {Link, useLocation} from "react-router-dom";

import "../css/Navbar.css";
import buzz from "../img/buzzIcon.png";

const navPages = [
	{title: "Catalog", path: "/catalog/"},
	{title: "Grades", path: "/grades/"},
	{title: "Enrollment", path: "/enrollment/"},
	{title: "Scheduler", path: "/scheduler/"},
	{title: "Ratings", path: "/ratings/"},
	{title: "About", path: "/about/"}
];

function Navbar() {
	const loc = useLocation();
	const activePath = loc.pathname + (loc.pathname.endsWith("/") ? "" : "/");

	// Currently only applying the navbar-dark class so that the hamburger icon appears when on mobile
	// Doesn't work on light mode (will require figuring out if mode is light or dark with js)
	return (
		<nav className="navbar navbar-dark navbar-expand-lg" id="navbar">
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarText"
				aria-controls="navbarText"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<Link className="navbar-brand" to="/">
				<img src={buzz} alt="Buzz" className="mr-2" />
				<b>
					G<span className="gt-gold">T</span>
				</b>{" "}
				<i>BuzzBook</i>
			</Link>
			<div className="collapse navbar-collapse" id="navbarText">
				<ul className="navbar-nav ml-auto">
					{navPages.map(page => (
						<li
							key={page.path}
							className={
								"nav-item" + (page.path === activePath ? " active" : "")
							}
						>
							<Link className="nav-link" to={page.path}>
								{page.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
