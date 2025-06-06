import "./css/Settings.css";

interface SettingsProps {
  onClose: () => void;
  focusTime: number;
  setFocusTime: (time: number) => void;
  shortBreakTime: number;
  setShortBreakTime: (time: number) => void;
  longBreakTime: number;
  setLongBreakTime: (time: number) => void;
}

const Settings = ({
  onClose,
  focusTime,
  setFocusTime,
  shortBreakTime,
  setShortBreakTime,
  longBreakTime,
  setLongBreakTime,
}: SettingsProps) => {
  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h3>Settings</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="settings-content">
          <div className="setting-item">
            <label>Focus Duration (minutes):</label>
            <input
              type="number"
              min="1"
              max="60"
              value={focusTime}
              onChange={(e) => setFocusTime(Number(e.target.value))}
            />
          </div>
          <div className="setting-item">
            <label>Short Break (minutes):</label>
            <input
              type="number"
              min="1"
              max="30"
              value={shortBreakTime}
              onChange={(e) => setShortBreakTime(Number(e.target.value))}
            />
          </div>
          <div className="setting-item">
            <label>Long Break (minutes):</label>
            <input
              type="number"
              min="1"
              max="60"
              value={longBreakTime}
              onChange={(e) => setLongBreakTime(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
