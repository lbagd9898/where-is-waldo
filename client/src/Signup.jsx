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

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch(`${import.meta.env.VITE_API_URL}/get-highscore`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentWinner(data.name);
        setCurrentHighScore(data.score);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to load highscore");
        setLoading(false);
      })
      .finally(() => clearTimeout(timeout));
  }, []);

  function onChange(e) {
    setInputVal(e.target.value);
    console.log(inputVal);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputVal.length >= 3) {
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
      <div className="flex flex-col border-4 justify-center items-center border-[#E7CD78] p-3 md:p-6 lg:p-8 font-harryPotter text-[#E7CD78] bg-[#00001b] gap-2 md:gap-4 lg:gap-6">
        <h1 className="text-xl md:text-3xl lg:text-4xl">
          Welcome to Wizard Catching.
        </h1>
        <h2 className="text-sm md:text-lg lg:text-xl">
          Enter a username to begin.
        </h2>
        <form className="flex gap-3 md:gap-5 lg:gap-6" onSubmit={handleSubmit}>
          <input
            onChange={onChange}
            value={inputVal}
            className="round text-[#00001b] p-1 md:p-2 lg:p-2 md:text-base lg:text-lg"
            type="text"
          />
          <button
            type="submit"
            className="border-2 border-[#E7CD78] active:scale-95 transition-transform py-1 px-2 md:py-2 md:px-3 lg:py-2 lg:px-5 rounded-lg hover:bg-[#000066] md:text-base lg:text-lg"
          >
            Submit{" "}
          </button>
        </form>
        <p
          className={`font-harryPotter text-[#E7CD78] text-sm md:text-base lg:text-lg ${flashConstraints ? "flash-constraints" : ""}`}
        >
          Username must be 3 characters or more.
        </p>
        {error ? (
          <p className="text-sm md:text-base lg:text-lg">{error}</p>
        ) : (
          <p className="text-base md:text-xl lg:text-2xl">
            Current Highscore: {currentWinner} - {format(hours)}:
            {format(minutes)}:{format(seconds)}
          </p>
        )}
      </div>
    </div>
  );
}
