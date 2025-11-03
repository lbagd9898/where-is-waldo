import findMe from "../../assets/findMe.png";
import { useState, useRef } from "react";

export default function Content({ checkCoords }) {
  const imgRef = useRef(null);
  const [menuVisibility, setMenuVisibility] = useState({
    x: 0,
    y: 0,
    visible: false,
  });
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);

  function clickHandle(e) {
    const img = imgRef.current;

    //show dropdown menu

    const rect = img.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log([e.clientX, e.clientY]);
    console.log(rect);

    setMenuVisibility({
      x: e.clientX,
      y: e.clientY,
      visible: true,
    });

    const worldX = (x / rect.width) * img.naturalWidth;
    const worldY = (y / rect.height) * img.naturalHeight;
    console.log([worldX, worldY]);
    setx(worldX);
    sety(worldY);
  }

  return (
    <div className="relative flex-1 flex justify-center items-center">
      <img
        ref={imgRef}
        onClick={clickHandle}
        src={findMe}
        alt="Find me picture."
        className="h-full w-auto auto-contain cursor-pointer"
      />
      {menuVisibility.visible && (
        <div
          className="font-harryPotter fixed z-[200] bg-[#E7CD78] text-[#00001b] p-4 rounded border-2 border-[#00001b]"
          style={{ top: menuVisibility.y, left: menuVisibility.x }}
        >
          <h1 className="text-xl">Choose your character</h1>
          <ul>
            <li
              onClick={() => checkCoords(x, y)}
              className="pl-1 hover:bg-[#D4B84F] cursor-pointer"
            >
              Ron
            </li>
            <li
              onClick={() => checkCoords(x, y)}
              className="pl-1 hover:bg-[#D4B84F] cursor-pointer"
            >
              Ogre
            </li>
            <li
              onClick={() => checkCoords(x, y)}
              className="pl-1 hover:bg-[#D4B84F] cursor-pointer"
            >
              Ghoul
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
