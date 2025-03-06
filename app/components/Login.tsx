"use client"
import { useEffect, useState } from "react";

export default function Login() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((json) => setData(json.fullname))
      .catch((err) => console.error("Error:", err));
  }, []);

  return <pre>{data ?<p>{data}</p> : <p>Loading...</p>}</pre>;
}
