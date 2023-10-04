import { Typography } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { newLevel } from "../levelLogic/levelLogic";
export const GameCard = ({
  url,
  name,
  gameLevel,
  wordLevel,
  setWarning,
  setOpenDialog,
  finished,
  setDialogData,
  time,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [pause, setPause] = useState(false);
  const randomPosition = useMemo(() => {
    const top = Math.abs(Math.random() * (window.innerHeight * 0.9 - 200));
    const left = Math.abs(Math.random() * (window.innerWidth - 200));
    return { top, left };
  }, []);

  const styles = {
    cursor: "pointer",
    p: "4px 8px",
    backdropFilter: "blur(16px) saturate(180%)",
    backgroundColor: "rgba(17, 25, 40, 0.75)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.125)",
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

  const handleClick = () => {
    setPause(true);
    const checker = newLevel.answerChecker(name, time, wordLevel);
    if (!checker) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
    } else {
      setDialogData({ name, url });
      setOpenDialog(true);
      setTimeout(()=>{
          newLevel.speak()
      },3100)
    }
  };

  return (
    <Typography onClick={handleClick} sx={styles}>
      {name}
    </Typography>
  );
};
