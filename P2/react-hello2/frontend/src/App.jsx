import React, { useEffect, useState } from "react";
const API_URL =
  import.meta.env.VITE_API_URL ||
  `${window.location.protocol}//${window.location.hostname}:3000`;
export default function App() {
  const [time, setTime] = useState("loading...");
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/time`)
      .then((r) => r.json())
      .then((d) => setTime(d.serverTime))
      .catch(() => setTime("error"));
    fetch(`${API_URL}/items`)
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => setItems([]));
  }, []);
  return (
    <div style={{ fontFamily: "system-ui, Arial", padding: 24 }}>
      <h1>Server time</h1>
      <p>{time}</p>
      <h2>Items</h2>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            {it.id}. {it.name} = {it.value}
          </li>
        ))}
      </ul>
      <small>API: {API_URL}</small>
    </div>
  );
}
