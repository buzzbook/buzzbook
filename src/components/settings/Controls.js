import React, {useState, useContext} from "react";
import Icon from "../../img/icon";
import DarkModeToggle from "react-dark-mode-toggle";
import {SettingsContext} from "../settings/SettingsContext";
import "../../css/Controls.css";
import $ from 'jquery';

const localStorage = window.localStorage;
const initialTheme = localStorage.getItem("theme");
if (initialTheme === "dark") {
	document.documentElement.classList.add("dark-theme");
} else if (initialTheme === "light") {
	localStorage.setItem("theme", "light");
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	document.documentElement.classList.add("dark-theme");
	localStorage.setItem("theme", "dark");
} else {
	localStorage.setItem("theme", "light");
}

let Prefs = JSON.parse(localStorage.getItem("settings"));
if (!Prefs) {
	localStorage.setItem("settings", JSON.stringify([1,3,2]));
	Prefs = [1,3,2];
}

function Controls() {
	const [theme, updateTheme] = useState(localStorage.getItem("theme") || "light");
	const {courselistSettings, toggleSettings} = useContext(SettingsContext);

	const toggleTheme = () => {
		document.documentElement.classList.add("themetransition");
		document.documentElement.classList.toggle("dark-theme");
		document.documentElement.classList.remove("themetransition");
		let newTheme = theme === "dark" ? "light" : "dark";
		localStorage.setItem("theme", newTheme);
		updateTheme(newTheme);
	};

	const toggleSetting = (index, state) => {
		if (Prefs[index] !== state){
			Prefs[index] = state;
			toggleSettings(Prefs);
			console.log(courselistSettings);
			localStorage.setItem("settings", JSON.stringify(Prefs));
		}
	};

	const openSettings = () => {
		if ($('#settingsbox').css("visibility") === "hidden"){
			$('#settingsbox').addClass('openmenu');
			$('html').click(function(event) {
		    if ($(event.target).closest('#settingsbox, .settingsicon').length === 0) {
	        $('#settingsbox').removeClass('openmenu');
		    }
			});
		}else{
			$('#settingsbox').removeClass('openmenu');
		}
	}

	return (
		<div className="position-fixed" style={{top: "2.1rem", right: "1.5rem"}}>
			{/*<svg
				id="theme-toggle-icon"
				alt={theme === "dark" ? "sun" : "moon"}
				onClick={toggleTheme}
				style={{cursor: "pointer", height: "35px", width: "35px"}}
			>
				<use href={theme === "dark" ? iconset+"#icon-sun" : iconset+"#icon-moon"} />
			</svg>*/}
			<DarkModeToggle
				onChange={toggleTheme}
				checked={theme === "dark"}
				size={40}
			/>
			<Icon
				name="settings"
				alt="settings"
				style={{height:20, width:20, cursor: "pointer"}}
				iconclass="iconfilter ml-3 settingsicon"
				onClick={openSettings}
			/>
			<div id="settingsbox" className = "position-absolute noselect">
				<div className="sectionlabelfont">Settings</div>
				<div className="settingsitem">
					<div className="contentfont">Result Display</div>
					<div className="btn-group btn-group-toggle" data-toggle="buttons">
					  <label className="btn btn-secondary contentfont">
					    <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked={Prefs[0] === 1} onClick={() => toggleSetting(0,1)}/>Compact
					  </label>
					  <label className="btn btn-secondary contentfont">
					    <input type="radio" name="options" id="option2" autoComplete="off" defaultChecked={Prefs[0] === 2} onClick={() => toggleSetting(0,2)}/>Expanded
					  </label>
					</div>
				</div>
				<div className="settingsitem">
					<div className="contentfont">Grade Display</div>
					<div className="btn-group btn-group-toggle" data-toggle="buttons">
					  <label className="btn btn-secondary contentfont">
					    <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked={Prefs[1] === 1} onClick={() => toggleSetting(1,1)}/>Letter
					  </label>
					  <label className="btn btn-secondary contentfont">
					    <input type="radio" name="options" id="option2" autoComplete="off" defaultChecked={Prefs[1] === 2} onClick={() => toggleSetting(1,2)}/>GPA
					  </label>
						<label className="btn btn-secondary contentfont">
					    <input type="radio" name="options" id="option2" autoComplete="off" defaultChecked={Prefs[1] === 3} onClick={() => toggleSetting(1,3)}/>Both
					  </label>
					</div>
				</div>
				<div className="settingsitem">
					<div className="contentfont">Grade Coloring</div>
					<div className="btn-group btn-group-toggle" data-toggle="buttons">
					  <label className="btn btn-secondary contentfont">
					    <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked={Prefs[2] === 1} onClick={() => toggleSetting(2,1)}/>By Letter
					  </label>
					  <label className="btn btn-secondary contentfont">
					    <input type="radio" name="options" id="option2" autoComplete="off" defaultChecked={Prefs[2] === 2} onClick={() => toggleSetting(2,2)}/>By Bin
					  </label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Controls;

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
