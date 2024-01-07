import React, { useState, useEffect } from 'react';
import 'firebase/auth';

const Timer = () => {
  const [user, setUser] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [breakTimerMinutes, setBreakTimerMinutes] = useState(5);
  const [breakTimerSeconds, setBreakTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (timerRunning) {
      timerInterval = setInterval(() => {
        if (timerMinutes === 0 && timerSeconds === 0) {
          clearInterval(timerInterval);
          setTimerRunning(false);
          startBreakTimer();
        } else {
          if (timerSeconds === 0) {
            setTimerMinutes((prev) => prev - 1);
            setTimerSeconds(59);
          } else {
            setTimerSeconds((prev) => prev - 1);
          }
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [timerRunning, timerMinutes, timerSeconds]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimerMinutes(25);
    setTimerSeconds(0);
    setTimerRunning(false);
  };

  const startBreakTimer = () => {
    setBreakTimerMinutes(5);
    setBreakTimerSeconds(0);
    setTimerRunning(true);
  };

  return (
    <div>
      <h1>Welcome, {user ? user.email : 'Guest'}!</h1>
      <div>
        <p>
          {timerMinutes.toString().padStart(2, '0')}:{timerSeconds.toString().padStart(2, '0')}
        </p>
        <button onClick={startTimer} disabled={timerRunning}>
          Start
        </button>
        <button onClick={pauseTimer} disabled={!timerRunning}>
          Pause
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div>
        <p>
          Break Time: {breakTimerMinutes.toString().padStart(2, '0')}:{breakTimerSeconds.toString().padStart(2, '0')}
        </p>
      </div>
    </div>
  );
};

export default Timer;
