"use client";
import { useState, useEffect } from "react";

type UserData = {
  id: number;
  name: string;
  email: string;
  joined: boolean;
  inactive: boolean;
};

type UserList = UserData[];

//you need to create a custom type for displaying the data cuz everything needs a type for ts
function UserInfo({ user }: { user: UserData }) {
  return (
    <div>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Joined:</strong> {user.joined ? 'Yes' : 'No'}</p>
      <p><strong>Inactive:</strong> {user.inactive ? 'Yes' : 'No'}</p>
      <hr />
    </div>
  );
}

//i think for jsons and returning things cleanly, you just have to create an array ..? and then iterate through the array to display things
export default function Dashboard() {
  const [users, setUsers] = useState<UserList>([]);

  useEffect(() => {
    fetch("/api/get_users") 
      .then((res) => res.json())
      .then((json) => setUsers(json))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      {users.length > 0 ? (
        users.map((user) => <UserInfo key={user.id} user={user} />)  //i think the map function creates an implicit id thingie??
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
