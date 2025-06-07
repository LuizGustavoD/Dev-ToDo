import "./accountStyle.css";
import { useState, useEffect } from "react";

function AccountPage() {
  const [userData, setUserData] = useState(null);
  const [stats, setUserStats] = useState({
    tasksCompleted: 0,
  });
  useEffect(() => {
    fetch("http://localhost:5000/auth/stats", {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserStats(data.stats);
        } else {
          setUserStats({ tasksCompleted: 0 });
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar estatísticas do usuário:", err);
        setUserStats({ tasksCompleted: 0 });
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/stats/user", {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserData(data.user);
        } else {
          setUserData(null);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar dados do usuário:", err);
        setUserData(null);
      });
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-container">
      <h1>My Account</h1>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Tasks Completed: {stats.tasksCompleted}</p>
    </div>
  );
}

export default AccountPage;
