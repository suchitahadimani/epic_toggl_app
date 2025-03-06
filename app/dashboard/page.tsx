"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);


  //if its a post request, you have to explicitly define it, i think get allows for a default return??
  useEffect(() => {
    fetch("/api/detailed_report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setStats(json);
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Detailed Summary</h1>
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(stats, null, 2)}</pre>}
    </div>
  );
}
