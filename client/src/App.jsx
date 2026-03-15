import { useState, useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import "./fonts.css";
import WinnerModal from "./components/WinnerModal/WinnerModal";
import ServerError from "./components/ServerError/ServerError";

function App({ username }) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [clockRunning, setClockRunning] = useState(true);
  const [won, setWon] = useState(false);
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
  }

  const [remainingChars, setRemainingChars] = useState({
    ghoul: true,
    ogre: true,
    ron: true,
  });

  const [flash, setFlash] = useState(false);
  const [greenFlash, setGreenFlash] = useState(false);

  async function checkCoords(x, y, charId) {
    const payload = { x, y, charId };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch(`${import.meta.env.VITE_API_URL}/check-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Server error");
        return response.json();
      })
      .then((data) => {
        if (data.char == null) {
          missedChord();
        } else {
          hitChar(data.char);
        }
      })
      .catch((error) => {
        console.error(error);
        setServerError(true);
        setTimeout(() => setServerError(false), 4000);
      })
      .finally(() => clearTimeout(timeout));
  }

  function missedChord() {
    triggerFlash();
  }

  function triggerFlash() {
    setFlash(true);
    setTimeout(() => setFlash(false), 2000);
  }

  function triggerGreenFlash() {
    setGreenFlash(true);
    setTimeout(() => setGreenFlash(false), 2000);
  }

  function hitChar(char) {
    const name = char.name.toLowerCase();
    setRemainingChars((prev) => ({ ...prev, [name]: false }));
    triggerGreenFlash();
  }

  useEffect(() => {
    const allFalse = Object.values(remainingChars).every(
      (value) => value === false
    );
    if (allFalse) {
      stopTimer();
      setWon(true);
    }
  }, [remainingChars]);

  useEffect(() => {
    if (!won) return;
    const payload = { username, secondsElapsed };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch(`${import.meta.env.VITE_API_URL}/enter-winner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Server error");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to submit your score to the server, sorry.");
      })
      .finally(() => clearTimeout(timeout));
  }, [won]);

  return (
    <div className="w-full h-full">
      <Header secondsElapsed={secondsElapsed} />
      <Content
        checkCoords={checkCoords}
        flash={flash}
        greenFlash={greenFlash}
        won={won}
      />
      <Footer remainingChars={remainingChars} />
      {won && (
        <WinnerModal
          username={username}
          secondsElapsed={secondsElapsed}
          won={won}
          error={error}
        />
      )}
      {serverError && <ServerError onDismiss={() => setServerError(false)} />}
    </div>
  );
}

export default App;
