import React from "react";

const TimerButton = ({ stateButtons }) => {
  // get the user selected time mode
  const [{ time: timeValue }] = stateButtons.filter((timeObj) => timeObj.apply);

  // save the time in seconds
  const [timeState, setTimeState] = React.useState(timeValue * 60);

  // button state
  const [isRunning, setIsRunning] = React.useState(false);

  // timeValue Change change the state value
  React.useEffect(() => {
    setTimeState(timeValue * 60);
    setIsRunning(false);
  }, [timeValue]);

  // countdown timer func
  React.useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeState((prevTime) => {
          if (prevTime > 0) {
            // the timer has not reached the end
            return prevTime - 1;
          } else {
            // the timer has reached the end
            setIsRunning(false);
            return timeValue * 60;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // func takes the seconds and return the [minutes:seconds] as string
  function convertSeconds(seconds) {
    let minutes = Math.floor(seconds / 60).toString();
    let remainingSeconds = (seconds % 60).toString();

    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }
    if (remainingSeconds.length === 1) {
      remainingSeconds = "0" + remainingSeconds;
    }

    return `${minutes}:${remainingSeconds}`;
  }

  // func handle the timer button click
  function handleTimerButtonClick() {
    setIsRunning((preValue) => !preValue);
  }

  return (
    <section className="timer-container">
      <button className="timer-btn" onClick={handleTimerButtonClick}>
        <svg className="timer-svg">
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="40%" stopColor="#161932"></stop>
              <stop offset="100%" stopColor="#272b45"></stop>
            </linearGradient>
          </defs>
          <circle
            className="border-circle"
            cx={"50%"}
            cy={"50%"}
            r={"49%"}
          ></circle>
          <circle
            className="timer-circle"
            cx={"50%"}
            cy={"50%"}
            r={"44%"}
            strokeDashoffset={`${277 - (timeState / (timeValue * 60)) * 277}%`}
          ></circle>
        </svg>
        <div className="timer-states-container">
          <span id="time-state">{convertSeconds(timeState)}</span>
          <span id="btn-state">{isRunning ? "PAUSE" : "START"}</span>
        </div>
      </button>
    </section>
  );
};

export default TimerButton;
