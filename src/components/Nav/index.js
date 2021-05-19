import React, {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import $ from "jquery";
import './nav.scss';

import Icon from "../../img/icon";

const navPages = [
	{title: "Catalog", path: "/catalog/", icon: "Category"},
	{title: "Grades", path: "/grades/", icon: "Chart"},
	{title: "Enrollment", path: "/enrollment/", icon: "Paper-Plus"},
	{title: "Scheduler", path: "/scheduler/", icon: "Calendar"},
	{title: "Ratings", path: "/ratings/", icon: "Graph"},
];
const navPagesBot = [
	{title: "About", path: "/about/", icon: "Info-Square"}
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
		<nav className="pad-v__8 flex-v space-between h-100">
			<div className="gap-v__4">
				<div className="gap-v__0 main-logo"> 
					<Link className="" to="/">
						<Icon name="logo" />
					</Link>
					<h3>Buzzbook</h3>
					<p>Beta 1.2</p>
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
							<Icon name={page.icon} />
							<h4 >{page.title}</h4>
						
					</div>
					</Link>
				))}
			</div>
			<div className="gap-v__5">
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
							<Icon name={page.icon} />
							<h4 class="bold">{page.title}</h4>
						
					</div>
					</Link>
				))}
			</div>
		</nav>
	);
}

export default Nav;
