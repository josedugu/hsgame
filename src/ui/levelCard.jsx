import "./cards.css";
export const CardLevel = ({
  cardImg,
  avt,
  setter,
  level,
  showCounter,
  setCanvas,
  startTimer,
  newLevel
}) => {
  const handleClcik = () => {
    newLevel.speakText("Muy bien, vamos a empezar, recuerda hacer clic en la imagen del animal que escuches")
    setter(level);
    showCounter(true);
    setTimeout(() => {
      showCounter(false), 
      setCanvas(true);
      if (newLevel) {
        newLevel.speak();
        startTimer(true);
      } else {
        console.log("NO LLEGO newGame");
      }
    }, 8000);
  };
  return (
    <div onClick={handleClcik} className="card-main-container">
      <img src={cardImg} />
      <img src={avt} />
    </div>
  );
};
