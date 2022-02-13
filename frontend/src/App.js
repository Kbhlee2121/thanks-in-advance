import React from "react";
import "./App.css";
import Main from "./components/Main";

function App() {
  const date = new Date();
  return (
    <div>
      <header>
        {/* reactstrap breadcrumc? */}
        <nav>
          <h5>Home</h5>
        </nav>
        <h1>Thanks in Advance</h1>
      </header>
      <Main />
      <footer className="my-5 mb-2 text-center">
        Copyright {date.getFullYear()} &copy; All Rights Reserved{" "}
      </footer>
    </div>
  );
}

export default App;
