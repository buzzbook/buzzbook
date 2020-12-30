import React from 'react'
import iconset from './iconset.svg'

export const usePreload = (url) => {
  const [loaded, setLoaded] = React.useState(false);
  const onLoad = React.useCallback(() => {
    setLoaded(true);
  }, []);
  React.useEffect(() => {
    const prefetchLink = document.createElement('link');
    prefetchLink.href = url;
    prefetchLink.rel = 'prefetch';
    prefetchLink.as = 'image';
    prefetchLink.addEventListener('load', onLoad);
    document.body.appendChild(prefetchLink);
    //clean up
    return () => document.body.removeChild(prefetchLink);
  }, [onLoad, url]);
  return loaded;
};

const Icon = props => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			className={`${props.iconclass} icon-${props.size}`}
			alt={`${props.alt}`}
      style={props.style}
			onClick={props.onClick}
		>
			<use xlinkHref={`${iconset}#${"icon-" + props.name}`} />
		</svg>
	)
}

// var failcount = 0;

// function IconAlt(props) {
// 	const url = `${iconset}#icon-${props.name}`;
//   const loaded = usePreload(url);
// 	console.log(loaded);
// 	// if (!loaded) {
// 	// 	failcount++;
// 	// 	console.log(failcount);
// 	// }
//   return (
//     loaded && ( //if svg is loaded
// 	    <svg
// 				xmlns="http://www.w3.org/2000/svg"
// 				xmlnsXlink="http://www.w3.org/1999/xlink"
// 				className={`${props.iconclass} icon-${props.size}`}
// 				alt={`${props.alt}`}
// 				onClick={props.onClick}
// 			>
// 	      <use xlinkHref={url}></use>
// 	    </svg>
//     )
//   );
// }

// Icon.propTypes = {
//   name: PropTypes.string.isRequired,
// };
// export default memo(Icon);

export default Icon;
