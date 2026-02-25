import React, { useEffect, useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// 🔥 Replace with your config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [fireStatus, setFireStatus] = useState(false);
  const [gasLevel, setGasLevel] = useState(0);
  const [alertTime, setAlertTime] = useState("--");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fireRef = ref(database, "fireSystem");
    onValue(fireRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFireStatus(data.fireStatus);
        setGasLevel(data.gasLevel);
        setAlertTime(data.alertTime);
      }
    });

    const logRef = ref(database, "fireLogs");
    onValue(logRef, (snapshot) => {
      const logs = [];
      snapshot.forEach((child) => logs.push(child.val()));
      setHistory(logs.reverse());
    });
  }, []);

  return (
    <div className={`container ${fireStatus ? "fire-background" : ""}`}>

      <h1 className="title">⚡ FIRE ALERT SYSTEM ⚡</h1>

      <div className={`status-panel ${fireStatus ? "alert" : "safe"}`}>
        {fireStatus ? "🚨 FIRE DETECTED" : "🟢 SAFE ZONE"}
      </div>

      <div className="grid">
        <div className="card">
          <h3>Gas Level</h3>
          <div className="big-value">{gasLevel}</div>
        </div>

        <div className="card">
          <h3>Last Alert</h3>
          <div className="big-value">{alertTime}</div>
        </div>
      </div>

      <div className="history">
        <h2>⚡ Event History</h2>

        {history.length === 0 && <p>No alerts yet</p>}

        {history.map((log, index) => (
          <div key={index} className="history-item">
            <span>🔥 {log.gasLevel}</span>
            <span>⏰ {log.time}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;