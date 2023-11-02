import "./cards.css";
import { useEffect } from "react";
export const CardLevel = ({
  cardImg,
  avt,
  setter,
  level,
  showCounter,
  setCanvas,
  startTimer,
  newLevel,
  allowedLevels,
}) => {
  useEffect(()=>{
    return newLevel?.stopSpeaking()
  },[newLevel])

  const handleClcik = () => {
    if (level <= allowedLevels) {
      newLevel.speakText(
        "Muy bien, vamos a empezar, recuerda hacer clic en la imagen del animal que escuches"
      );
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
      }, 7000);
    }else{
      newLevel.speakText(
        "Aun no haz desbloqueado este nivel"
      );
    }
  };
  return (
    <div onClick={handleClcik} className={`card-main-container ${level <= allowedLevels?"":"not-allowed"}`}>
      <img src={cardImg} />
      <img src={avt} />
    </div>
  );
};
