
import React, { useEffect, useRef, useState } from "react";
import './../styles/App.css';

const App = () => {
  // Lap timer application code will go here

  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const formatTime = (timeInCentiseconds) => {
    // 6000 centiseconds = 1 minute
    const minutes = Math.floor(timeInCentiseconds / 6000);
    // 100 centiseconds = 1 second
    const seconds = Math.floor((timeInCentiseconds % 6000) / 100);
    // Remaining centiseconds
    const centiSeconds = timeInCentiseconds % 100;

    // Convert padStart 1 digit number to 2 digit number
    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(minutes)}:${pad(seconds)}:${pad(centiSeconds)}`;
  }

  const handleStart = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10); // Update every 10 milliseconds (1 centisecond)
    }
  }

  const handleStop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  const handleLap = () => {
    setLaps(prevLaps => [...prevLaps, time]);
  }

  const handleReset = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTime(0);
    setLaps([]);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  
  return (
    <div>
        <div>
          <h1>{formatTime(time)}</h1>

          <div>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleLap}>Lap</button>
            <button onClick={handleReset}>Reset</button>
          </div>

          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>Lap {index + 1}: {formatTime(lapTime)}</li>
            ))}

          </ul>
        </div>
    </div>
  )
}

export default App
