import React from "react";

export const Settings = {
  courselistSettings: [1,3,2], //[courselistitem height, grade display format, grade color format]
  toggleSettings: () => {console.log("hi")},
};

export const SettingsContext = React.createContext(Settings);
