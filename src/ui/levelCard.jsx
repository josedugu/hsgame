import { newLevel } from "../levelLogic/levelLogic";
import "./cards.css";

export const CardLevel = ({
  cardImg,
  avt,
  setter,
  level,
  showCounter,
  setCanvas,
  startTimer,
}) => {
  const handleClcik = () => {
    setter(level);
    showCounter(true);
    setTimeout(() => {
      showCounter(false), setCanvas(true);
      if (newLevel) {
        newLevel.speak();
        startTimer(true);
      } else {
        console.log("NO LLEGO newGame");
      }
    }, 5000);
  };
  return (
    <div onClick={handleClcik} className="card-main-container">
      <img src={cardImg} />
      <img src={avt} />
    </div>
  );
};
