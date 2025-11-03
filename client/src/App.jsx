import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import "./fonts.css";

function App() {
  async function checkCoords(x, y) {
    const payload = { x, y };
    console.log(payload);
    fetch("http://localhost:3000/check-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div class="flex flex-col h-screen">
      <Header></Header>
      <Content checkCoords={checkCoords}></Content>
      <Footer></Footer>
    </div>
  );
}

export default App;
