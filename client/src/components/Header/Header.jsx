import ron from "../../assets/ron.png";
import ogre from "../../assets/ogre.png";
import ghoul from "../../assets/ghoul.png";

export default function Header({ secondsElapsed }) {
  const seconds = secondsElapsed % 60;
  const hours = Math.floor(secondsElapsed / 3600);
  const minutes = Math.floor((secondsElapsed % 3600) / 60);

  const format = (time) => time.toString().padStart(2, "0");

  return (
    <header class="font-harryPotter text-[#E7CD78] bg-[#00001b] relative flex flex-row p-9 md:p-6 justify-between items-center">
      <h1 class="text-3xl md:text-2xl text-wrap">Where are the Wizards?</h1>
      <div class="flex gap-4 items-center absolute left-1/2 transform -translate-x-1/2">
        <p class="text-2xl">Find the Wizards:</p>
        <div class="flex items-center gap-3">
          <div class="flex flex-col items-center gap-2">
            <img src={ron} alt="" className="w-12 h-12 rounded-full" />
            <p>Ron</p>
          </div>
          <div class="flex flex-col items-center gap-2">
            <img src={ogre} alt="" className="w-12 h-12 rounded-full" />
            <p>Ogre</p>
          </div>
          <div class="flex flex-col items-center gap-2">
            <img src={ghoul} alt="" className="w-12 h-12 rounded-full" />
            <p>Ghoul</p>
          </div>
        </div>
      </div>
      <div class="text-xl">
        Time: {format(hours)}:{format(minutes)}:{format(seconds)}
      </div>
    </header>
  );
}
