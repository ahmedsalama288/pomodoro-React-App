import React from "react";

const PopupStylingSettings = ({
  displayPopup,
  setDisplayPopup,
  setStateButtons,
  setUpdateCssVars,
}) => {
  // [input] create a state to keep track of the validation of the input value
  const [inputError, setInputError] = React.useState([false, false, false]);

  // [input] create a state that saves the change at the time of the timer in the popup component
  const [changeTime, setChangeTime] = React.useState([25, 1, 15]);

  // [fonts] create a state to save the value and index of the clicked button
  const [fontButton, setFontButton] = React.useState({
    index: 0,
    value: "Kumbh Sans",
  });

  // [colors] create a color state to save the value and index of the clicked button
  const [colorsButton, setColorsButton] = React.useState({
    index: 0,
    value: "#f87272",
  });

  // [input] chick the input value and update the value of inputError array state
  function chickInputValue(inputValue, index) {
    // convert inputValue to int(inputValue)
    inputValue = parseInt(inputValue);
    if (isNaN(inputValue) || inputValue <= 0 || inputValue > 60) {
      setInputError((prevArr) => {
        prevArr[index] = true;
        return [...prevArr];
      });
    } else if (inputError[index]) {
      setInputError((prevArr) => {
        prevArr[index] = false;
        return [...prevArr];
      });
    }
  }

  // [input] function to handle change at the time of the timer
  function handleTimeInputChange(el, index) {
    const newValue = el.target.value;
    setChangeTime((preValue) => {
      const updatedValue = [...preValue];
      updatedValue[index] = newValue;
      return updatedValue;
    });
    chickInputValue(newValue, index);
  }

  // [fonts] fonts changes handeler
  function fontChangeButtonHandler(el, index) {
    // get the button attribute value
    const buttonValue = el.target.getAttribute("data-font-family");
    // update the state value
    setFontButton(() => ({ index, value: buttonValue }));
  }

  // [colors] handle the colors buttons change
  function colorChangeBtnHandler(el, index) {
    // get the button attribute value
    const buttonValue = el.currentTarget.getAttribute("data-color-value");
    // update the state value
    setColorsButton(() => ({ index, value: buttonValue }));
  }

  // function to handle apply button
  function handleApplyBtn() {
    const invalidInput = inputError.find((el) => el === true);
    if (invalidInput === true) return;

    // [1] map over the changeTime State and make the values of the elements to be integer
    const updateTimers = changeTime.map((el) => parseInt(el));

    // [2] update the value of the main timer state
    setStateButtons((prevObj) => {
      const newTimers = prevObj.map((timerObj, index) => ({
        ...timerObj,
        time: updateTimers[index],
      }));
      return newTimers;
    });

    // [3] update the css variables values
    const newFontFamily = fontButton.value;
    const newMainColor = colorsButton.value;
    setUpdateCssVars(() => ({
      fontFamily: newFontFamily,
      mainColor: newMainColor,
    }));
  }

  return (
    <>
      <div
        className={`popup-styling-settings ${
          displayPopup ? "display-popup" : ""
        }`}
      >
        <header>
          <h1>settings</h1>
          <button onClick={() => setDisplayPopup(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14">
              <path d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"></path>
            </svg>
          </button>
        </header>
        <section className="container">
          <div className="time-setting">
            <h2>TIME &#40;MINUTES&#41;</h2>
            <div className="change-times">
              <div className={`${inputError[0] ? "invalid-value" : ""}`}>
                <label htmlFor="pomodoro">pomodoro</label>
                <input
                  min={1}
                  type="number"
                  id="pomodoro"
                  value={changeTime[0]}
                  onChange={(el) => handleTimeInputChange(el, 0)}
                />
              </div>

              <div className={`${inputError[1] ? "invalid-value" : ""}`}>
                <label htmlFor="shortBreak">short Break</label>
                <input
                  min={1}
                  type="number"
                  id="shortBreak"
                  value={changeTime[1]}
                  onChange={(el) => handleTimeInputChange(el, 1)}
                />
              </div>

              <div className={`${inputError[2] ? "invalid-value" : ""}`}>
                <label htmlFor="longBreak">long Break</label>
                <input
                  min={1}
                  type="number"
                  id="longBreak"
                  value={changeTime[2]}
                  onChange={(el) => handleTimeInputChange(el, 2)}
                />
              </div>
            </div>
            {/* Error Massage */}
            {inputError.find((input) => input === true) && (
              <div className="error-massage">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="23"
                  height="23"
                  fill="white"
                >
                  <path
                    fillRule="evenodd"
                    fill="#fba2a2"
                    d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm8.036-4.024a.75.75 0 00-1.06 1.06L10.939 12l-2.963 2.963a.75.75 0 101.06 1.06L12 13.06l2.963 2.964a.75.75 0 001.061-1.06L13.061 12l2.963-2.964a.75.75 0 10-1.06-1.06L12 10.939 9.036 7.976z"
                  ></path>
                </svg>
                <p>
                  Make sure that timer duration is between 1 and 60 minutes!
                </p>
              </div>
            )}
          </div>
          <div className="customize-fonts">
            <h2>FONT</h2>
            <div>
              <button
                className={`${fontButton.index === 0 ? "active-font-btn" : ""}`}
                onClick={(el) => fontChangeButtonHandler(el, 0)}
                data-font-family="'Kumbh Sans', sans-serif"
              >
                Aa
              </button>
              <button
                className={`${fontButton.index === 1 ? "active-font-btn" : ""}`}
                onClick={(el) => fontChangeButtonHandler(el, 1)}
                data-font-family="'Roboto Slab', serif"
              >
                Aa
              </button>
              <button
                className={`${fontButton.index === 2 ? "active-font-btn" : ""}`}
                onClick={(el) => fontChangeButtonHandler(el, 2)}
                data-font-family="'Space Mono', monospace"
              >
                Aa
              </button>
            </div>
          </div>
          <div className="customize-colors">
            <h2>COLOR</h2>
            <div>
              <button
                className={`${
                  colorsButton.index === 0 ? "active-color-btn" : ""
                }`}
                data-color-value="#f87272"
                onClick={(el) => colorChangeBtnHandler(el, 0)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
                </svg>
              </button>
              <button
                className={`${
                  colorsButton.index === 1 ? "active-color-btn" : ""
                }`}
                data-color-value="#70f3f8"
                onClick={(el) => colorChangeBtnHandler(el, 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
                </svg>
              </button>
              <button
                className={`${
                  colorsButton.index === 2 ? "active-color-btn" : ""
                }`}
                data-color-value="#d881f8"
                onClick={(el) => colorChangeBtnHandler(el, 2)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
                </svg>
              </button>
            </div>
          </div>
        </section>
        <footer className="apply">
          <button onClick={() => handleApplyBtn()}>apply</button>
        </footer>
      </div>
      <div
        className={`out-layer ${displayPopup ? "display-popup" : ""}`}
        onClick={() => setDisplayPopup(false)}
      ></div>
    </>
  );
};

export default PopupStylingSettings;
