import React, { useEffect, useState } from "react";

const GREEN = "#4CAF50";
const RED = "#FF4136";
function Controls({ onStart, onStop, isRunning }) {
  const [buttonAction, setButtonAction] = useState<"Start" | "Stop">("Start");
  const [buttonColor, setButtonColor] = useState(GREEN);

  useEffect(() => {
    if (isRunning) {
      setButtonAction("Stop");
      setButtonColor(RED);
    } else {
      setButtonAction("Start");
      setButtonColor(GREEN);
    }
  }, [isRunning]);

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      <button
        onClick={() => {
          if (buttonAction === "Start") {
            onStart();
          } else {
            onStop();
          }
        }}
        style={{
          padding: "8px 16px",
          backgroundColor: buttonColor,
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {buttonAction}
      </button>
    </div>
  );
}

export default Controls;
