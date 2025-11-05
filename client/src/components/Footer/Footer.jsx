import ron from "../../assets/ron.png";
import ogre from "../../assets/ogre.png";
import ghoul from "../../assets/ghoul.png";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import "../../App.css";

export default function Footer({ remainingChars }) {
  const ronRef = useRef(null);
  const ogreRef = useRef(null);
  const ghoulRef = useRef(null);

  return (
    <footer class="bottom-0 font-harryPotter text-[#E7CD78] bg-[#00001b] p-6 flex justify-center items-center gap-3">
      <div class="text-xl lg:text-2xl">Remaining Wizards: </div>
      <div class="flex items-center gap-3">
        <CSSTransition
          in={remainingChars.ron}
          timeout={500}
          classNames="fade"
          nodeRef={ronRef}
          unmountOnExit
        >
          <div ref={ronRef} class="flex flex-col items-center gap-2">
            <img
              src={ron}
              alt=""
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
            />
            <p>Ron</p>
          </div>
        </CSSTransition>
        <CSSTransition
          in={remainingChars.ogre}
          timeout={500}
          classNames="fade"
          nodeRef={ogreRef}
          unmountOnExit
        >
          <div ref={ogreRef} class="flex flex-col items-center gap-2">
            <img
              src={ogre}
              alt=""
              className="w-10 h-10 lg:w-12 lg:h-12  rounded-full"
            />
            <p>Ogre</p>
          </div>
        </CSSTransition>
        <CSSTransition
          in={remainingChars.ghoul}
          timeout={500}
          classNames="fade"
          nodeRef={ghoulRef}
          unmountOnExit
        >
          <div ref={ghoulRef} class="flex flex-col items-center gap-2">
            <img
              src={ghoul}
              alt=""
              className="w-10 h-10 lg:w-12 lg:h-12  rounded-full"
            />
            <p>Ghoul</p>
          </div>
        </CSSTransition>
      </div>
    </footer>
  );
}
