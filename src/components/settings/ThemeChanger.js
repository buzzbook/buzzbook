import React, {useState} from "react";
import sun from "../../img/sun.svg";
import moon from "../../img/moon.svg";

const localStorage = window.localStorage;
const initialTheme = localStorage.getItem("theme");
if (!initialTheme) {
	localStorage.setItem("theme", "dark");
} else if (initialTheme === "light") {
	document.body.classList.add("light-theme");
}

function ThemeChanger() {
	const [theme, updateTheme] = useState(initialTheme || "dark");

	const toggleTheme = () => {
		document.body.classList.toggle("light-theme");
		let newTheme = theme === "dark" ? "light" : "dark";
		localStorage.setItem("theme", newTheme);
		updateTheme(newTheme);
	};

	return (
		<div className="position-fixed" style={{top: 20, right: 20}}>
			<img
				id="theme-toggle-icon"
				src={theme === "dark" ? sun : moon}
				alt={theme === "dark" ? "sun" : "moon"}
				height="35px"
				onClick={toggleTheme}
				style={{cursor: "pointer"}}
			/>
		</div>
	);
}

export default ThemeChanger;
