import './gameCard.css'
import { Typography } from "@mui/material";
import { useState, useEffect, useMemo } from "react";

export const GameCard = ({
  newLevel,
  url,
  name,
  gameLevel,
  wordLevel,
  setWarning,
  setOpenDialog,
  setDialogData,
  time,
  closeDialog,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [pause, setPause] = useState(false);

  const randomPosition = useMemo(() => {
    const top = Math.abs(Math.random() * (window.innerHeight * 0.9 - 200));
    const left = Math.abs(Math.random() * (window.innerWidth - 200));
    return { top, left };
  }, []);

  const styles = {
    //position:"fixed",
    cursor: "pointer",
    p: "4px 8px",
    backdropFilter: "blur(16px) saturate(180%)",
    backgroundColor: "rgba(17, 25, 40, 0.75)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.125)",
    transition: "all linear infinite alternate"
  };
  useEffect(() => {
    if (gameLevel % 2 === 0 || gameLevel === 5) {
      const moveCircle = () => {
        const top = Math.abs(Math.random() * (window.innerHeight * 0.9 - 200));
        const left = Math.abs(Math.random() * window.innerWidth - 200);

        const newPosition = {
          top: top,
          left: left,
        };
        setPosition(newPosition);
      };
      let interval;
      if (gameLevel === 5) {
        interval = setInterval(moveCircle, 800);
      }
      interval = setInterval(moveCircle, 2000);
      if (pause) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [pause, gameLevel]);
  if (gameLevel % 2 === 0 || gameLevel === 5) {
    styles.position = "absolute";
    styles.top = position.top;
    styles.left = position.left;
  } else {
    styles.position = "absolute";
    styles.top = randomPosition.top;
    styles.left = randomPosition.left;
  }

  const handleClick = async () => {
    console.log(url);
    //setPause(true);
    const checker = newLevel.answerChecker(name, time, wordLevel);
    if (!checker) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
    } else {
      setDialogData({ name, url });
      setOpenDialog(true);

      if (
        "SpeechRecognition" in window ||
        "webkitSpeechRecognition" in window
      ) {
        const recognition = new (window.SpeechRecognition ||
          window.webkitSpeechRecognition)();
        recognition.lang = "es-ES";
        recognition.continuous = true;
        recognition.interimResults = true;

        const rec = setTimeout(() => {
          console.log("FIN DEL INTENTO"), recognition.stop();
          closeDialog();
          newLevel.speak();
        }, 10000);

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          console.log(transcript);

          if (transcript.includes(name)) {
            clearTimeout(rec);
            recognition.stop();
            closeDialog();
            newLevel.speak();
          }
        };
        recognition.onerror = (event) => {
          console.error("Error en reconocimiento de voz:", event.error);
        };
        recognition.onend = () => {
          console.log("Fin de la transcripción");
        };
        recognition.start();
      } else {
        console.error(
          "El navegador no admite la API de reconocimiento de voz."
        );
      }
    }
  };

  return (
    <div  >
    <Typography sx={styles}   onClick={handleClick} >
      {name}
    </Typography>
    </div>
  );
};
