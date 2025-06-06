import Timer from "./components/Timer";
import Controls from "./components/Controls";
import Settings from "./components/Settings";
import "./App.css";
import { useState } from "react";

function App() {
  const [sessionType, setSessionType] = useState<
    "Focus" | "Short Break" | "Long Break"
  >("Focus");
  const [isRunning, setIsRunning] = useState(false);
  const [shortBreakCount, setShortBreakCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const [focusTime, setFocusTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(10);

  const handleSessionEnd = () => {
    console.log(`shortBreakCount ${shortBreakCount}`);

    // Play a simple beep sound using Web Audio API
    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 800; // Frequency in Hz
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 1
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);

    if (sessionType === "Focus") {
      const nextCount = shortBreakCount === 2 ? 0 : shortBreakCount + 1;
      const nextSessionType =
        shortBreakCount === 2 ? "Long Break" : "Short Break";

      setShortBreakCount(nextCount); // Pure updater
      setSessionType(nextSessionType); // Separate call, no dependency on inside of another setState
    } else {
      setSessionType("Focus");
    }

    setIsRunning(false);
  };

  const getInitialMinutes = () => {
    switch (sessionType) {
      case "Focus":
        return focusTime;
      case "Long Break":
        return longBreakTime;
      case "Short Break":
        return shortBreakTime;
    }
  };

  return (
    <>
      {/* Settings button in top right corner */}
      <button
        className="settings-button"
        onClick={() => setShowSettings(true)}
        aria-label="Settings"
      >
        ⚙️
      </button>

      {/* Settings modal */}
      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
          focusTime={focusTime}
          setFocusTime={setFocusTime}
          shortBreakTime={shortBreakTime}
          setShortBreakTime={setShortBreakTime}
          longBreakTime={longBreakTime}
          setLongBreakTime={setLongBreakTime}
        />
      )}
      <Timer
        initialMinutes={getInitialMinutes()}
        onSessionEnd={handleSessionEnd}
        sessionType={sessionType}
        isRunning={isRunning}
      ></Timer>
      <Controls
        onStart={() => setIsRunning(true)}
        onStop={() => setIsRunning(false)}
        isRunning={isRunning}
      ></Controls>
    </>
  );
}

export default App;
