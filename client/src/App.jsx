import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import "./fonts.css";

function App() {
  const [remainingChars, setRemainingChars] = useState({
    ghoul: true,
    ogre: true,
    ron: true,
  });

  const [flash, setFlash] = useState(false);

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

  function hitChar(char) {
    console.log(char);
    const name = char.name.toLowerCase();
    setRemainingChars((prev) => ({ ...prev, [name]: false }));
  }

  function triggerFlash() {
    setFlash(true);
    setTimeout(() => setFlash(false), 2000); // remove class after 2 seconds
  }

  return (
    <div class={`flex flex-col h-screen`}>
      <Header></Header>
      <Content checkCoords={checkCoords} flash={flash}></Content>
      <Footer remainingChars={remainingChars}></Footer>
    </div>
  );
}

export default App;
