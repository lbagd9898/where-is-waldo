import { useState, useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import "./fonts.css";
import WinnerModal from "./components/WinnerModal/WinnerModal";
import ServerError from "./components/ServerError/ServerError";

function App({ username }) {
  //interval to time user as they play
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [clockRunning, setClockRunning] = useState(true);
  const [won, setWon] = useState(false);
  //mutable variable to keep track of seconds elapsed
  const interval = useRef(null);
  const [error, setError] = useState(null);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    if (clockRunning) {
      interval.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval.current);
  }, [clockRunning]);

  function stopTimer() {
    setClockRunning(false);
    clearInterval(interval.current);
    console.log(secondsElapsed);
  }

  //user's remaining characters to find
  const [remainingChars, setRemainingChars] = useState({
    ghoul: true,
    ogre: true,
    ron: true,
  });

  //flash red if user gets a charater wrong
  const [flash, setFlash] = useState(false);

  //flash green if user gets a character right
  const [greenFlash, setGreenFlash] = useState(false);

  async function checkCoords(x, y, charId) {
    const payload = { x, y, charId };
    console.log(payload);
    fetch("http://localhost:3000/api/check-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.char == null) {
          missedChord();
        } else {
          hitChar(data.char);
        }
      })
      .catch((error) => {
        console.log(error);
        setServerError(true);
      });
  }

  function missedChord() {
    triggerFlash();
  }

  function triggerFlash() {
    setFlash(true);
    setTimeout(() => setFlash(false), 2000); // remove class after 2 seconds
  }

  function triggerGreenFlash() {
    setGreenFlash(true);
    setTimeout(() => setGreenFlash(false), 2000);
  }

  function hitChar(char) {
    console.log(char);
    const name = char.name.toLowerCase();
    setRemainingChars((prev) => ({ ...prev, [name]: false }));
    triggerGreenFlash();
  }

  //checks if user won every time they find a character
  useEffect(() => {
    const allFalse = Object.values(remainingChars).every(
      (value) => value === false
    );
    if (allFalse) {
      console.log("you won!");
      stopTimer();
      setWon(true);
    }
  }, [remainingChars]);

  //if player wins, winner data is enterred into server db
  useEffect(() => {
    if (!won) return;
    console.log("sending server data");
    const payload = { username, secondsElapsed };
    fetch("http://localhost:3000/api/enter-winner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.error);
        setError(error.error);
      });
  }, [won]);

  return (
    <div class="w-full h-full">
      <Header secondsElapsed={secondsElapsed}></Header>
      <Content
        checkCoords={checkCoords}
        flash={flash}
        greenFlash={greenFlash}
        won={won}
      ></Content>
      <Footer remainingChars={remainingChars}></Footer>
      {won && (
        <WinnerModal
          username={username}
          secondsElapsed={secondsElapsed}
          won={won}
          error={error}
        />
      )}
      {serverError && <ServerError />}
    </div>
  );
}

export default App;
