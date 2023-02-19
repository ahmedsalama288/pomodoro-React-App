import React from "react";

const TimerControls = ({ setStateButtons }) => {
  const [activeButton, setActiveButton] = React.useState(0);

  function handleButtonClick(index) {
    setActiveButton(index);
    setStateButtons((prevArr) => {
      prevArr.forEach((obj) => (obj.apply = false));
      prevArr[index].apply = true;

      return [...prevArr];
    });
  }

  return (
    <header>
      <h1>pomodoro</h1>
      <nav>
        <div className="buttons-container">
          <button
            className={activeButton === 0 ? "active" : ""}
            onClick={() => handleButtonClick(0)}
            aria-label="pomodoro time"
          >
            pomodoro
          </button>
          <button
            className={activeButton === 1 ? "active" : ""}
            onClick={() => handleButtonClick(1)}
            aria-label="short break time"
          >
            short break
          </button>
          <button
            className={activeButton === 2 ? "active" : ""}
            onClick={() => handleButtonClick(2)}
            aria-label="long break time"
          >
            long break
          </button>
        </div>
      </nav>
    </header>
  );
};

export default TimerControls;
