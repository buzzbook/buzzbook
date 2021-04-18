import Fuse from "fuse.js";
import courses from "../../scripts/courses";

const fuse = (entries) => new Fuse(entries || courses, {
    keys: [
        {name: "id", weight: 0.4},
        {name: "name", weight: 0.3},
        {name: "description", weight: 0.15},
        {name: "dept", weight: 0.15}
    ],
    includeScore: true
})

export default fuse;