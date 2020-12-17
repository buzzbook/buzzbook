import React, {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import $ from "jquery";

import "../css/Nav.css";
import itLogo from "../img/itLogo.png";
import iconset from "../img/iconset.svg";
//import Icon from '../img/icon';

const navPages = [
	{title: "Catalog", path: "/catalog/"},
	{title: "Grades", path: "/grades/"},
	{title: "Enrollment", path: "/enrollment/"},
	{title: "Scheduler", path: "/scheduler/"},
	{title: "Ratings", path: "/ratings/"},
	{title: "About", path: "/about/"}
];

function Nav() {
	const loc = useLocation();
	const activePath = loc.pathname + (loc.pathname.endsWith("/") ? "" : "/");

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
		<nav className="nav flex-column">
			<ul className="pl-5">
				<li>
					<Link className="navbar-brand p-0" to="/">
						<img src={itLogo} alt="Buzz" />
						{/*
						<Icon
							name="itlogo"
							alt="Buzz"
							iconclass="mr-2 icon-dark"
						/>
						<br />
					<b>
						G<span className="theme">T</span>
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
							className={"px-0 " + (activePath.includes(page.path) ? "navselectedfont" : "navfont")}
							to={page.path}
						>
							{page.title}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default Nav;
