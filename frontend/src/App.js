import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Main from "./components/Main";

function App() {
  const navigate = useNavigate();
  const date = new Date();
  //user is an object
  const [user, setUser] = useState(null);
  const checkUser = () => {
    const savedUser = localStorage.getItem("loggedUser");
    if (savedUser !== null) {
      setUser(JSON.parse(savedUser));
    }
  };

  useEffect(() => checkUser(), []);

  const logout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
    navigate("/");
  };

  // const currentUser = JSON.parse(localStorage.getItem("logged_user"))(
  //   currentUser !== null
  // )
  //   ? setUser(currentUser)
  //   : setUser(null);
  return (
    <div>
      {user != null ? (
        <Main user={user} logout={logout} />
      ) : (
        <Login setUser={setUser} />
      )}
      <footer className="my-5 mb-2 text-center">
        Copyright {date.getFullYear()} &copy; All Rights Reserved{" "}
      </footer>
    </div>
  );
}

export default App;
