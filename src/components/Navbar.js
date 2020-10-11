import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import $ from "jquery";

import "../css/Navbar.css";
import buzz from "../img/buzzIcon.png";
import sun from "../img/sun.svg";
import moon from "../img/moon.svg";

const navPages = [
	{title: "Catalog", path: "/catalog/"},
	{title: "Grades", path: "/grades/"},
	{title: "Enrollment", path: "/enrollment/"},
	{title: "Scheduler", path: "/scheduler/"},
	{title: "Ratings", path: "/ratings/"},
	{title: "About", path: "/about/"}
];

const localStorage = window.localStorage;
const initialTheme = localStorage.getItem("theme");
if(!initialTheme) {
	localStorage.setItem("theme", "dark");
} else if(initialTheme === "light") {
	document.body.classList.add("light-theme");
}

function Navbar() {
	const loc = useLocation();
	const activePath = loc.pathname + (loc.pathname.endsWith("/") ? "" : "/");

	const [theme, updateTheme] = useState(initialTheme || "dark");
	
	const toggleTheme = () => {
		document.body.classList.toggle("light-theme");
		let newTheme = theme === "dark" ? "light" : "dark";
		localStorage.setItem("theme", newTheme);
		updateTheme(newTheme);
	};

	// This stops button group buttons from fading when changing themes
	useEffect(() => {
		$("#theme-toggle-icon").on("mouseover", () => {
			$(".button-group button").css("transition", "0s");
		});
		$("#theme-toggle-icon").on("mouseout", () => {
			$(".button-group button").css("transition", "0.25s");
		});
	});

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
			<div>
				<img id="theme-toggle-icon" src={theme === "dark" ? sun : moon} alt={theme === "dark" ? "sun" : "moon"} height="35px" onClick={toggleTheme} style={{cursor: "pointer"}} className="ml-1" />
			</div>
		</nav>
	);
}

export default Navbar;
