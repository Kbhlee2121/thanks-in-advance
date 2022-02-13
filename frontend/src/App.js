import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Main from "./components/Main";

function App() {
  const date = new Date();
  //user is an object
  const [user, setUser] = useState(null);
  // const currentUser = JSON.parse(localStorage.getItem("logged_user"))(
  //   currentUser !== null
  // )
  //   ? setUser(currentUser)
  //   : setUser(null);
  return (
    <div>
      {user != null ? <Main user={user} /> : <Login setUser={setUser} />}

      <footer className="my-5 mb-2 text-center">
        Copyright {date.getFullYear()} &copy; All Rights Reserved{" "}
      </footer>
    </div>
  );
}

export default App;
