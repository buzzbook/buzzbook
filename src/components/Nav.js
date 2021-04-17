import React, {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import $ from "jquery";

import itLogo from "../img/itLogo.png";

const navPages = [
	{title: "Catalog", path: "/catalog/"},
	{title: "Grades", path: "/grades/"},
	{title: "Enrollment", path: "/enrollment/"},
	{title: "Scheduler", path: "/scheduler/"},
	{title: "Ratings", path: "/ratings/"},
];
const navPagesBot = [
	{title: "About", path: "/about/"}
]

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
		<nav className="padv--8 flex-v space-between h-100">
			<div className="gapv--5">
				<div>
					<Link className="navbar-brand p-0" to="/">
						<img src={itLogo} alt="Buzz" width="40" height="40" />
	
					</Link>
				</div>
				{navPages.map(page => (
					<Link 
					className="no-deco"
					
					to={page.path}
				>
					<div
						key={page.path}
						className={
							"primary-button pure-button" +
							(activePath.includes(page.path) ? " active" : "")
						}
					>
						
							<p class="bold">{page.title}</p>
						
					</div>
					</Link>
				))}
			</div>
			<div className="gapv--5">
			{navPagesBot.map(page => (
					<Link 
					className="no-deco"
					
					to={page.path}
				>
					<div
						key={page.path}
						className={
							"primary-button pure-button" +
							(activePath.includes(page.path) ? " active" : "")
						}
					>
						
							<p class="bold">{page.title}</p>
						
					</div>
					</Link>
				))}
			</div>
		</nav>
	);
}

export default Nav;
