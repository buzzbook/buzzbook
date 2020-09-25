import React from "react";
import PropTypes from "prop-types";

function RatingBar({value, max = 5, highIsBetter}) {
	const rating = (value / max) * 100;

	let color = "var(--green)";
	if (highIsBetter) {
		if (rating < 33) color = "var(--red)";
		else if (rating < 67) color = "var(--orange)";
	} else {
		if (rating >= 80) color = "var(--red)";
		else if (rating >= 60) color = "var(--orange)";
	}

	return (
		<div
			className="w-100 p-1"
			style={{
				backgroundColor: "var(--course-hover)",
				height: 20,
				borderRadius: 20
			}}
		>
			<div
				className=""
				style={{
					backgroundColor: color,
					width: `${rating}%`,
					height: "100%",
					borderRadius: 20
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
