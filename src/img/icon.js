import React from 'react'

import iconset from './iconset.svg'

const Icon = props => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			className={`${props.iconclass}`}
			alt={`${props.alt}`}
			onClick={props.onClick}
		>
			<use xlinkHref={`${iconset}#${"icon-" + props.name}`} />
		</svg>
	)
}

export default Icon
