import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Signup from "./Signup.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function Main() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");

  const saveUsername = (input) => {
    console.log(input);
    setUsername(input);
  };

  const signIn = () => setIsSignedIn(true);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Signup
              saveUsername={saveUsername}
              signIn={signIn}
              isSignedIn={isSignedIn}
            />
          }
        ></Route>
        <Route
          path="/play"
          element={
            isSignedIn ? (
              <App username={username} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        ></Route>
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
