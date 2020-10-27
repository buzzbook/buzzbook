import React from "react";
import graphic from "../img/homePageGraphic.png";
import "../css/Home.css";

function Home() {
	return (
		<div className="home-content">
			<div>
				<div style={{fontSize: "4rem"}}>
					<b>
						<span className="gt-gold">Georgia Tech</span>
					</b>{" "}
					<i>BuzzBook</i>
				</div>
				<h5>A reenvisioned course catalog. Made by students, for students.</h5>
			</div>
			<img src={graphic} alt="student" />
		</div>
	);
}

export default Home;
