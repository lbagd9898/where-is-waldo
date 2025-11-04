import "./Signup.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ saveUsername, signIn, isSignedIn }) {
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();
  const [flashConstraints, setFlashConstraints] = useState(false);
  const [currentWinner, setCurrentWinner] = useState("");
  const [currentHighScore, setCurrentHighScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const seconds = currentHighScore % 60;
  const hours = Math.floor(currentHighScore / 3600);
  const minutes = Math.floor((currentHighScore % 3600) / 60);

  const format = (time) => time.toString().padStart(2, "0");

  //fetch highscore data from server
  useEffect(() => {
    try {
      fetch("http://localhost:3000/get-highscore")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCurrentWinner(data.name);
          setCurrentHighScore(data.score);
          setLoading(false);
        });
    } catch (e) {
      console.error(e);
      setError("Failed to load highscore");
      setLoading(false);
    }
  }, []);

  function onChange(e) {
    setInputVal(e.target.value);
    console.log(inputVal);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputVal.length > 3) {
      saveUsername(inputVal);
      signIn();
    } else {
      console.log("not long enough");
      setTimeout(() => setFlashConstraints(true), 1000);
      setFlashConstraints(false);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      navigate("/play");
    }
  }, [isSignedIn]);

  if (loading)
    return (
      <p className="flex justify-center items-center text-4xl font-harryPotter text-[#E7CD78]">
        Loading...
      </p>
    );

  return (
    <div>
      <div className="flex flex-col border-4 justify-center items-center border-[#E7CD78] p-4 font-harryPotter text-[#E7CD78] bg-[#00001b] gap-3">
        <h1 className="text-2xl">Welcome to Wizard Catching.</h1>
        <h2>Enter a username to begin.</h2>
        <form className="flex gap-4" onSubmit={handleSubmit}>
          <input
            onChange={onChange}
            value={inputVal}
            className="round text-[#00001b] p-1"
            type="text"
          />
          <button
            type="submit"
            className="border-2 border-[#E7CD78] py-1 px-2 rounded-lg hover:bg-[#000066]"
          >
            Submit{" "}
          </button>
        </form>
        <p
          className={`font-harryPotter text-[#E7CD78] ${flashConstraints ? "flash-constraints" : ""}`}
        >
          Username must be 3 characters or more.
        </p>
        {error ? (
          <p>{error}</p>
        ) : (
          <p className="text-xl">
            Current Highscore: {currentWinner} - {format(hours)}:
            {format(minutes)}:{format(seconds)}
          </p>
        )}
      </div>
    </div>
  );
}
