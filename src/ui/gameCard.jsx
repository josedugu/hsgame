import "./gameCard.css";
import { Avatar, Stack } from "@mui/material";
import { keyframes } from "@mui/system";
import { useRef } from "react";
import GameDialog from "./gameDialog";

export const GameCard = ({
  newLevel,
  url,
  name,
  gameLevel,
  wordLevel,
  index,
  checkAnswer,
  setWarning,
}) => {
  const dialogRef = useRef();
  const handleClick = async () => {
    const check = checkAnswer(name, wordLevel);
    console.log(check);
    if (check) {
      dialogRef.current.openDialog();
    } else {
      setWarning((prev) => [...prev, 1]);
    }
  };
  const goldWord = (txt) => {
    newLevel?.isGold(txt);
  };
  const nextWord = () => {
    newLevel?.speak();
  };
  const bounceX = keyframes`from { left: 0; } to { left: 90%; }`;
  const bounceY = keyframes`from { top: ${index * 100}px; } to { top: 500px; }`;
  const bounceRightX = keyframes`from { left: 90%; } to { left: 0; }`;
  const bounceRightY = keyframes`from { top:500px;  } to { top: ${
    index * 100
  }px; }`;

  const bounceStiles = {
    cursor: "pointer",
    position: gameLevel === 1 || gameLevel === 3 ? "" : "absolute",
    animation:
      gameLevel === 1 || gameLevel === 3
        ? "none"
        : `${bounceX} ${
            gameLevel === 5 ? 4 : 9
          }s linear 0s infinite alternate, ${bounceY} ${
            gameLevel === 5 ? 4 : 9
          }s linear 0s infinite alternate;`,
  };
  const bounceStilesRight = {
    cursor: "pointer",
    position: gameLevel === 1 || gameLevel === 3 ? "" : "absolute",
    animation:
      gameLevel === 1 || gameLevel === 3
        ? "none"
        : `${bounceRightX} ${
            gameLevel === 5 ? 4 : 9
          }s linear 0s infinite alternate, ${bounceRightY} ${
            gameLevel === 5 ? 4 : 9
          }s linear 0s infinite alternate;`,
  };

  return (
    <Stack
      onClick={handleClick}
      sx={index % 2 === 0 ? bounceStiles : bounceStilesRight}
    >
      <Avatar alt={name} src={url} sx={{ width: "100px", height: "100px" }} />
      <GameDialog
        ref={dialogRef}
        name={name}
        url={url}
        goldWord={goldWord}
        nextWord={nextWord}
      />
    </Stack>
  );
};
