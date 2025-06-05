import "./css/Settings.css";

interface SettingsProps {
  onClose: () => void;
}

const Settings = ({ onClose }: SettingsProps) => {
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
            <input type="number" min="1" max="60" defaultValue="25" />
          </div>
          <div className="setting-item">
            <label>Short Break (minutes):</label>
            <input type="number" min="1" max="30" defaultValue="5" />
          </div>
          <div className="setting-item">
            <label>Long Break (minutes):</label>
            <input type="number" min="1" max="60" defaultValue="15" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
