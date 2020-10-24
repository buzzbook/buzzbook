import React, { useLayoutEffect } from "react";

function Layout({ id, col1Content, col2Content, col3Content }) {
	useLayoutEffect(() => {
		// let navHeight = document.getElementById("navbar").getBoundingClientRect().height + 2;
		let navHeight = 0;
		document.getElementById(
			id
		).style.height = `calc(100vh - ${navHeight}px)`;
	});
	return (
		<div className="col-page row mx-0" id={id}>
			<div className="col-3 h-100 p-3">
				{col1Content}
			</div>
			<div className="col-3 h-100 p-3">
				{col2Content}
			</div>
			<div className="col-6 h-100 p-3">
				{col3Content}
			</div>
		</div>
	);
}

export default Layout;
