import Timer from "./components/Timer";
import Controls from "./components/Controls";
import "./App.css";
import { useState } from "react";

function App() {
  const [sessionType, setSessionType] = useState<
    "Focus" | "Short Break" | "Long Break"
  >("Focus");
  const [isRunning, setIsRunning] = useState(false);
  const [shortBreakCount, setShortBreakCount] = useState(0);

  const handleSessionEnd = () => {
    console.log(`shortBreakCount ${shortBreakCount}`);

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
        return 0.1;
      case "Long Break":
        return 0.05;
      case "Short Break":
        return 0.02;
    }
  };

  return (
    <>
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
