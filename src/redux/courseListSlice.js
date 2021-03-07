import {createSlice} from "@reduxjs/toolkit";
import courses from "../scripts/courses";

var startID = Object.keys(courses)[0];
let path = window.location.href.split("/");
if (path.length === 5) {
	let iDParts = path[4].split("+");
	let currID = iDParts[0] + " " + iDParts[1];
	currID = currID.toUpperCase();
	if (currID !== startID) {
		if (courses[currID]) {
			// Will only update starting course to match URL if it's a valid course
			startID = currID;
		}
	}
}

const defaultFilters = {campus: {value: "Any", label: "Any"}};

export const courseListSlice = createSlice({
	name: "courseList",
	initialState: {
		selectedCourse: startID,
		// Saved courses is an object full of courseID: true entries
		// This is because searching an object is O(1) vs O(n) for an array
		savedCourses: {},
    selectAll: false,
		filters: defaultFilters,
		sort: {value: "Course ID", label: "Course ID"},
		searchQuery: ""
	},
	reducers: {
    /** handles all select in home page */
    allSelect: (state, action) => {
      state.selectAll = !state.selectAll;
      Object.keys(state.savedCourses).forEach(course => {
        state.savedCourses[course].checked = state.selectAll;
        Object.keys(state.savedCourses[course]["sections"]).forEach(section => {
          state.savedCourses[course]["sections"][section] = state.selectAll;
        });
      });
    },
    /** handles course check in home page */
    checkHomeCourse: (state, action) => {
      const course = action.payload;
      const checkedCourse = state.savedCourses[course];
      const checked = !checkedCourse["checked"];
      checkedCourse["checked"] = checked;

      // set all sections to checked/unchecked
      Object.keys(checkedCourse.sections).forEach(key => {
        checkedCourse["sections"][key] = checked;
      });
      if (!checked) {
        // remove select all since one course is not selected
        state.selectAll = false;
      }
    },
    /** handles section check in home page */
    checkHomeSection: (state, action) => {
      const course = Object.keys(action.payload)[0];
      const section = Object.values(action.payload)[0];
      const checkedCourse = state.savedCourses[course];

      if (checkedCourse["sections"][section] === false) {
        // check the section
        checkedCourse["sections"][section] = true;

        let sectionCheckedList = Object.keys(checkedCourse["sections"]).map(key => checkedCourse["sections"][key]);
        // if every section in a course is checked, check the course
        if (sectionCheckedList.every(bool => bool)) {
          checkedCourse["checked"] = true;
        }
      } else {
        // uncheck the section
        checkedCourse["sections"][section] = false;
        // uncheck course since a section is unchecked 
        checkedCourse["checked"] = false;
        // uncheck select all
        state.selectAll = false;
      }
    },
		updateSelectedCourse: (state, action) => {
			state.selectedCourse = action.payload;
		},
		/** Adds a course by its course ID */
		saveCourse: (state, action) => {
			state.savedCourses[action.payload] = {checked: false, sections: {}};
		},
		/** Removes a course by its course ID */
		removeCourse: (state, action) => {
			delete state.savedCourses[action.payload];
    },
    toggleSection: (state, action) => {
      const course = Object.keys(action.payload)[0];
      const section = Object.values(action.payload)[0];
      if (state.savedCourses[course] === undefined) {
        // add course if not saved
        state.savedCourses[course] = {checked: false, sections: {}};
      }
      if (state.savedCourses[course]["sections"][section] === undefined) {
        // saving the section
        state.savedCourses[course]["sections"][section] = false;
      } else {
        // removing the section
        delete state.savedCourses[course]["sections"][section];
      }
    },
		updateFilter: (state, action) => {
			state.filters[action.payload.name] = action.payload.value;
		},
		resetFilters: state => {
			state.filters = defaultFilters;
		},
		updateSort: (state, action) => {
			state.sort = action.payload;
		},
		updateSearchQuery: (state, action) => {
			state.searchQuery = action.payload;
		}
	}
});

export const {
  allSelect,
  checkHomeCourse,
  checkHomeSection,
	updateSelectedCourse,
	saveCourse,
  removeCourse,
  toggleSection,
	updateFilter,
	resetFilters,
	updateSort,
	updateSearchQuery
} = courseListSlice.actions;

export const getSelectAll = state => state.courseList.selectAll;
export const getSelectedCourse = state => state.courseList.selectedCourse;
export const getSavedCourses = state => state.courseList.savedCourses;
export const getFilters = state => state.courseList.filters;
export const getSort = state => state.courseList.sort;
export const getSearchQuery = state => state.courseList.searchQuery;

export default courseListSlice.reducer;
