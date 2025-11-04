export default function WinnerModal({ username, secondsElapsed }) {
  const seconds = secondsElapsed % 60;
  const hours = Math.floor(secondsElapsed / 3600);
  const minutes = Math.floor((secondsElapsed % 3600) / 60);

  const format = (time) => time.toString().padStart(2, "0");
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="flex flex-col border-4 justify-center items-center border-[#E7CD78] p-4 font-harryPotter text-[#E7CD78] bg-[#00001b] gap-3">
        <h1 className="text-2xl">Congratulations, {username}! </h1>
        <p>You have caught all wizards in a time of: </p>
        <p>
          {format(hours)}:{format(minutes)}:{format(seconds)}
        </p>
        <h2> Well done! </h2>
      </div>
    </div>
  );
}
