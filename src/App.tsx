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
    let nextSessionType: "Focus" | "Short Break" | "Long Break";
    console.log(`shortBreakCount ${shortBreakCount}`);
    if (sessionType === "Focus") {
      if (shortBreakCount === 2) {
        nextSessionType = "Long Break";
        setShortBreakCount(0);
      } else {
        nextSessionType = "Short Break";
        setShortBreakCount((prev) => prev + 1);
      }
    } else {
      nextSessionType = "Focus";
    }

    setSessionType(nextSessionType);
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
