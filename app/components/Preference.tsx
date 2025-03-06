"use client"
import { useEffect, useState } from "react";

export default function Preference() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/preferences")
      .then((res) => res.json())
      .then((json) => setData(json))
      .then((json) => { console.log(json);})
      .catch((err) => console.error("Error:", err));
  }, []);

  return <pre>{data ? <p>{JSON.stringify(data, null, 2)}</p>  : <p>Loading...</p>}</pre>;
}
