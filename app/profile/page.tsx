"use client"
import { useState } from "react";
import Login from "../components/Login";


export default function InviteUserForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/join_work", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });

      
      const data = await response.json();
      console.log(JSON.stringify(email))
      if (data.error) {
        console.error(data.error);
      } else {
        console.log("Invitation sent successfully:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Login />
      <h1> Want to join our workspace? Enter your email below to get an invitation link</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Send Invitation</button>
      </form>
    </div>


  );
}
