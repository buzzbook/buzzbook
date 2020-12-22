import React, {useState} from "react";
import iconset from "../../img/iconset.svg";

const localStorage = window.localStorage;
const initialTheme = localStorage.getItem("theme");
if (initialTheme === "dark") {
	document.documentElement.classList.add("dark-theme");
}

function ThemeChanger() {
	const [theme, updateTheme] = useState(initialTheme || "light");

	const toggleTheme = () => {
		document.documentElement.classList.toggle("dark-theme");
		let newTheme = theme === "dark" ? "light" : "dark";
		localStorage.setItem("theme", newTheme);
		updateTheme(newTheme);
	};

	return (
		<div className="position-fixed" style={{top: 20, right: 20}}>
			<svg
				id="theme-toggle-icon"
				alt={theme === "dark" ? "sun" : "moon"}
				onClick={toggleTheme}
				style={{cursor: "pointer", height: "35px", width: "35px"}}
			>
				<use href={theme === "dark" ? iconset+"#icon-sun" : iconset+"#icon-moon"} />
			</svg>
		</div>
	);
}

export default ThemeChanger;

// <div className="position-fixed" style={{top: 20, right: 20}}>
// 	<img
// 		id="theme-toggle-icon"
// 		src={theme === "dark" ? sun : moon}
// 		alt={theme === "dark" ? "sun" : "moon"}
// 		height="35px"
// 		onClick={toggleTheme}
// 		style={{cursor: "pointer"}}
// 	/>
// </div>
