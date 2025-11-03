import findMe from "../../assets/findMe.png";
import { useRef } from "react";

export default function Content() {
  const imgRef = useRef(null);

  function clickHandle(e) {
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const worldX = (x / rect.width) * img.naturalWidth;
    const worldY = (y / rect.height) * img.naturalHeight;
    console.log([worldX, worldY]);
  }

  return (
    <div class="flex-1 flex justify-center items-center">
      <img
        ref={imgRef}
        onClick={clickHandle}
        src={findMe}
        alt="Find me picture."
        class="h-full w-auto auto-contain"
      />
    </div>
  );
}
