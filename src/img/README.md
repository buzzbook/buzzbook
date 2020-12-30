# svg-sprites
raw icon files into `./raw_icons` and run `grunt`, svg-store will aggregate into `iconset.svg` and a demo file at `iconset-demo.html`. Icons can be accessed directly thru svg tag or `icon.js`
```
<Icon
	name="save"
	alt="save course"
	iconclass="saveIcon iconfilter"
	onClick={() => dispatch(saveCourse(course.courseID))}
/>
```
TODO:
flickering issue, preloader in `icon.js`
- chrome dev tools indicates it is loading `<link href="./iconset.svg" rel="prefetch" as="image">`, but most likely due to the selective loading w/ the courselist is getting "preloaded" everytime clicked
itlogo svg is not rendering properly, using png before can get a raw svg w/o masks
