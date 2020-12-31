// import React from "react";
//
// export const Settings = {
//   courselistSettings: [], //[courselistitem height, grade display format, grade color format]
//   toggleSettings: () => {},
// };
//
// export const SettingsContext = React.createContext(Settings);

import React, { useState } from 'react'

export const SettingsContext = React.createContext({
  courselistSettings: [], //[courselistitem height, grade display format, grade color format]
  toggleSettings: () => {},
})

export const SettingsContextProvider = (props) => {
  const initSetting = JSON.parse(localStorage.getItem('settings')) || [2,3,2];
  const toggleSettings = (setting) => {
    setState({...state, courselistSettings: setting})
  }

  const initState = {
    courselistSettings: initSetting,
    toggleSettings: toggleSettings
  }

  const [state, setState] = useState(initState)

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  )
}
