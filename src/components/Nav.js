import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import $ from "jquery";

import "../css/Nav.css";
import itLogo from "../img/itLogo.png";
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
if (!initialTheme) {
	localStorage.setItem("theme", "dark");
} else if (initialTheme === "light") {
	document.body.classList.add("light-theme");
}

function Nav() {
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
		let dropdownTrans = "";
		$("#theme-toggle-icon")
			.on("mouseover", () => {
				dropdownTrans = $(".dropdownButton").css("transition");
				$(".dropdownButton").css("transition", "0s");
			})
			.on("mouseout", () => {
				$(".dropdownButton").css("transition", dropdownTrans);
			});
	});

	return (
		<nav className="nav flex-column pl-4">
			<ul className="pl-0">
				<li>
					<Link className="navbar-brand" to="/">
						<img src={itLogo} alt="Buzz" className="mr-2" />
						{/* <br />
					<b>
						G<span className="gt-gold">T</span>
					</b>{" "}
					<i>BuzzBook</i> */}
					</Link>
				</li>
				{navPages.map(page => (
					<li
						key={page.path}
						className={
							"nav-item" +
							(page.path === activePath ? " active" : "")
						}
					>
						<Link
							className="nav-link px-0 pt-1 pb-2"
							to={page.path}
						>
							<b style={{fontSize: "1.2rem"}}>{page.title}</b>
						</Link>
					</li>
				))}
			</ul>
			<div>
				<img
					id="theme-toggle-icon"
					src={theme === "dark" ? sun : moon}
					alt={theme === "dark" ? "sun" : "moon"}
					height="35px"
					onClick={toggleTheme}
					style={{cursor: "pointer"}}
				/>
			</div>
		</nav>
	);
}

export default Nav;
