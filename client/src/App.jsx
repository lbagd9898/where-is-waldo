import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import "./fonts.css";

function App() {
  //interval to time user as they play
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    fetch("http://localhost:3000/check-data", {
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
      .catch((error) => console.log(error));
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
    }
  }, [remainingChars]);

  return (
    <div class={`flex flex-col h-screen`}>
      <Header secondsElapsed={secondsElapsed}></Header>
      <Content
        checkCoords={checkCoords}
        flash={flash}
        greenFlash={greenFlash}
      ></Content>
      <Footer remainingChars={remainingChars}></Footer>
    </div>
  );
}

export default App;
