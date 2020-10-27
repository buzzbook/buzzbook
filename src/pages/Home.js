import React from "react";
import graphic from "../img/homePageGraphic.png";

function Home() {
	return (
		<div className="text-center">
			<h1>
				<b>
					<span className="gt-gold">Georgia Tech</span>
				</b>{" "}
				<i>BuzzBook</i>
			</h1>
			<h5>A reenvisioned course catalog. Made by students, for students.</h5>
			<img
				src={graphic}
				alt="student"
				className="mx-auto"
				style={{maxWidth: "40%"}}
			/>
		</div>
	);
}

export default Home;
