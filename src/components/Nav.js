import React, {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import $ from "jquery";

import "../css/Nav.css";
import itLogo from "../img/itLogo.png";

import Icon from "../img/icon";

const navPages = [
	{title: "Catalog", path: "/catalog/"},
	{title: "Grades", path: "/grades/"},
	{title: "Enrollment", path: "/enrollment/"},
	{title: "Scheduler", path: "/scheduler/"},
	{title: "Ratings", path: "/ratings/"},
];
const aboutPage = {title: "About", path: "/about/"};

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
			<ul>
        <div className="nav-title">
          <li>
            <Link className="navbar-brand p-0" to="/">
              <img src={itLogo} alt="Buzz" />
              {/*
              <Icon
                name="itlogo"
                alt="Buzz"
                iconclass="mr-2 iconfilter"
              />
              <br />
            <b>
              G<span className="theme">T</span>
            </b>{" "}
            <i>BuzzBook</i> */}
            </Link>
          </li>
          <h4>BuzzBook</h4>
          <p>Beta 4.20</p>
        </div>
				{navPages.map(page => (
					<li
						key={page.path}
						className={
							"nav-item" +
							(page.path === activePath ? " active" : "")
						}
					>
						<Link
							className={(activePath.includes(page.path) ? "navselectedfont" : "navfont")}
							to={page.path}
						>
              <Icon
                name="enrollment"
                alt="enrollment icon"
                width="11px"
                iconclass="d-inline-block mr-3 iconfilter"
              />
							{page.title}
						</Link>
					</li>
				))}
			</ul>
      <div className="bottom-nav">
        <div className="feedback">
          <p>What do you think of our new app?</p>
          <Link to={aboutPage.path}>
            Send Feedback
          </Link>
        </div>
        <ul>
          <li
            key={aboutPage.path}
            className={
              "nav-item" +
              (aboutPage.path === activePath ? " active" : "")
            }
          >
            <Link
              className={(activePath.includes(aboutPage.path) ? "navselectedfont" : "navfont")}
              to={aboutPage.path}
            >
              <Icon
                name="enrollment"
                alt="enrollment icon"
                width="11px"
                iconclass="d-inline-block mr-3 iconfilter"
              />
              {aboutPage.title}
            </Link>
          </li>
        </ul>
      </div>
		</nav>
	);
}

export default Nav;
