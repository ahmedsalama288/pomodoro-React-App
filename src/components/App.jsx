import React from "react";

import TimerControls from "./TimerControls";
import TimerButton from "./TimerButton";
import SettingButton from "./SettingButton";
import PopupStylingSettings from "./PopupStylingSettings";

import "../styles/index.css";
function App() {
  // create state for the buttons
  const [stateButtons, setStateButtons] = React.useState([
    { id: 1, time: 25, apply: true },
    { id: 2, time: 1, apply: false },
    { id: 3, time: 15, apply: false },
  ]);

  // create state to display the popup
  const [displayPopup, setDisplayPopup] = React.useState(false);

  const [updateCssVars, setUpdateCssVars] = React.useState({
    fontFamily: "",
    mainColor: "",
  });

  React.useEffect(()=> {
    document.documentElement.style.setProperty('--font-one', updateCssVars.fontFamily);
    document.documentElement.style.setProperty('--button-backgroundcolor', updateCssVars.mainColor);
  }, [updateCssVars])

  return (
    <main>
      <TimerControls setStateButtons={setStateButtons} />
      <TimerButton stateButtons={stateButtons} />
      <SettingButton setDisplayPopup={setDisplayPopup} />
      <PopupStylingSettings
        displayPopup={displayPopup}
        setDisplayPopup={setDisplayPopup}
        setStateButtons={setStateButtons}
        setUpdateCssVars={setUpdateCssVars}
      />
    </main>
  );
}

export default App;
