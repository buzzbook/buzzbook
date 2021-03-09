import React from "react";
import PropTypes from "prop-types";
import {determineGradeColor} from '../settings/StatsUtils';

function RatingBar({value, max = 5, highIsBetter}) {
	const rating = (value / max) * 100;

	const color = determineGradeColor((value/5)*4)
	//console.log(value, color)

	return (
		<div
			className="w-100"
			style={{
				backgroundColor: "var(--contrastcolor)",
				height: 17,
				borderRadius: ".3rem",
				padding: ".28rem .3rem"
			}}
		>
			<div
				className=""
				style={{
					backgroundColor: color,
					width: `${rating}%`,
					height: "100%",
					borderRadius: ".25rem"
				}}
			></div>
		</div>
	);
}

RatingBar.propTypes = {
	value: PropTypes.number.isRequired,
	max: PropTypes.number,
	highIsBetter: PropTypes.bool.isRequired
};

export default RatingBar;
