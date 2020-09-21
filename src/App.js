import React from "react";
import "./css/App.css";
import buzz from "./img/buzzIcon.png";

function App() {
	return (
		<div className="text-center">
			<h1>
				<b>
					Georgia <span style={{color: "var(--gt-gold)"}}>Tech</span>
				</b>{" "}
				<i>BuzzBook</i>
			</h1>
			<h5>A reenvisioned course catalog, made by students, for students.</h5>
			<img
				src={buzz}
				alt="buzz"
				className="mx-auto"
				style={{maxWidth: "40%"}}
			/>
		</div>
	);
}

export default App;
