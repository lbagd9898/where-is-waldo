import { useNavigate } from "react-router-dom";

export default function WinnerModal({ username, secondsElapsed, error }) {
  const navigate = useNavigate();

  const seconds = secondsElapsed % 60;
  const hours = Math.floor(secondsElapsed / 3600);
  const minutes = Math.floor((secondsElapsed % 3600) / 60);

  const format = (time) => time.toString().padStart(2, "0");

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="flex flex-col border-4 justify-center items-center border-[#E7CD78] p-3 md:p-6 lg:p-8 font-harryPotter text-[#E7CD78] bg-[#00001b] gap-2 md:gap-4 lg:gap-6">
        <h1 className="text-xl md:text-3xl lg:text-4xl">
          Congratulations, {username}!
        </h1>
        <p className="text-sm md:text-lg lg:text-xl">
          You have caught all wizards in a time of:
        </p>
        <p className="text-sm md:text-lg lg:text-xl">
          {format(hours)}:{format(minutes)}:{format(seconds)}
        </p>
        <h2 className="text-sm md:text-lg lg:text-xl">Well done!</h2>
        <button
          onClick={() => navigate("/")}
          className="border-2 border-[#E7CD78] py-1 px-2 md:py-2 md:px-4 lg:py-2 lg:px-5 rounded-lg hover:bg-[#000066] active:scale-95 transition-transform text-sm md:text-lg lg:text-xl"
        >
          Play again
        </button>
        {error && (
          <p className="text-sm md:text-lg lg:text-xl">
            We were unable to send your score to the server, sorry.
          </p>
        )}
      </div>
    </div>
  );
}
