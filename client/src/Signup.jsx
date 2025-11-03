import "./Signup.css";
import { useState } from "react";

export default function Signup() {
  const [inputVal, setInputVal] = useState("");

  function onChange(e) {
    setInputVal(e.target.value);
    console.log(inputVal);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

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
      </div>
    </div>
  );
}
