import "./Signup.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ saveUsername, signIn, isSignedIn }) {
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();
  const [flashConstraints, setFlashConstraints] = useState(false);

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
      </div>
    </div>
  );
}
