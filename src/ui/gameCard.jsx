import "./gameCard.css";
import { Avatar, Stack } from "@mui/material";
import { keyframes } from "@mui/system";
import { useRef } from "react";
import GameDialog from "./gameDialog";
import { topValue, firstPoint } from "./position";
export const GameCard = ({
  newLevel,
  url,
  name,
  gameLevel,
  wordLevel,
  index,
  checkAnswer,
  setWarning,
  quantity,
  screenHeight,
  screenWidth,
}) => {
  const dialogRef = useRef();
  const angle = (360 / quantity) * (index + 1);
  const isTop0 = topValue(angle);
  const h = screenHeight / 2;
  const w = screenWidth / 2;
  let point = Math.floor(firstPoint({ angle, height: h, width: w })) - 100;
  if (
    angle === 45 ||
    angle === 90 ||
    angle === 135 ||
    angle === 180 ||
    angle === 225 ||
    angle === 270 ||
    angle === 315 ||
    angle === 360
  ) {
    point = 0;
  }

  //console.log("firstPoint", firstPoint({angle, height:h, width:w}));
  console.log(
    `La posicion en pixeles ${point}, top debe ser ${isTop0} ${name} ${angle}`
  );
  //console.log(`Alto ${screenHeight}, ancho ${screenWidth}`);

  let bounceX1 = keyframes`from { left: 50%; } to { left: calc(100% - 100px); }`;
  let bounceY1 = keyframes`from { top: 50%; } to { top: calc(100% - 100px); }`;
  ///////
  let bounceX = keyframes`from { left: calc(100% - 100px); } to { left: 0; }`;
  let bounceY = keyframes`from { top: calc(100% - 100px); } to { top: 0; }`;

  if (isTop0 === 100) {
    bounceX1 = keyframes`from { left: 50%; } to { left: ${point}px; }`;
    bounceY1 = keyframes`from { top: 50%; } to { top: calc(100% - 100px) }`;

    bounceX = keyframes`from { left: ${point}px; } to { left: 0; }`;
    bounceY = keyframes`from { top: calc(100% - 100px); } to { top: 0; }`;
  } else if (isTop0 === 0) {
    bounceX1 = keyframes`from { left: 50%; } to { left: ${point}px; }`;
    bounceY1 = keyframes`from { top: 50%; } to { top: 0 }`;

    bounceX = keyframes`from { left: ${point}px; } to { left: 0; }`;
    bounceY = keyframes`from { top: 0; } to { top: calc(100% - 100px); }`;
  } else if (!isTop0 && angle <= 180) {
    bounceX1 = keyframes`from { left: 50%; } to { left: 0; }`;
    bounceY1 = keyframes`from { top: 50%; } to { top: ${point}px}`;

    bounceX = keyframes`from { left: 0; } to { left: calc(100% - 100px); }`;
    bounceY = keyframes`from { top: ${point}px; } to { top: 0; }`;
  } else if (!isTop0 && angle >= 180) {
    bounceX1 = keyframes`from { left: 50%; } to { left: calc(100% - 100px); }`;
    bounceY1 = keyframes`from { top: 50%; } to { top: ${point}px}`;

    bounceX = keyframes`from { left: calc(100% - 100px); } to { left: 0; }`;
    bounceY = keyframes`from { top: ${point}px} to { top: 0; }`;
  }
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

  //console.log(`${name} es x=${Px} y Y=${Py}`);
  // const bounceX1 = keyframes`from { left: 50%; } to { left: calc(100% - 100px); }`;
  // const bounceY1 = keyframes`from { top: 50%; } to { top: calc(100% - 100px); }`;
  //const bounceX = keyframes`from { left: calc(100% - 100px); } to { left: 0; }`;
  //const bounceY = keyframes`from { top: calc(100% - 100px); } to { top: 0; }`;
  // const bounceRightX = keyframes`from { left: 90%; } to { left: 0; }`;
  // const bounceRightY = keyframes`from { top:500px;  } to { top: ${index * 100}px; }`;

  const bounceStiles = {
    cursor: "pointer",
    position: gameLevel === 1 || gameLevel === 3?"block":"absolute",
    animation:
      gameLevel === 1 || gameLevel === 3
        ? "none"
        : `${bounceX1} 10s linear 0s 1, ${bounceY1} 9s linear 0s 1, 
    ${bounceX} 5s linear 10s infinite alternate, ${bounceY} 3s linear 9s infinite alternate`,
  };
  // gameLevel === 1 || gameLevel === 3
  //   ? "none"
  //   : `${bounceX1} ${
  //       gameLevel === 5 ? 5 : 3
  //     }s linear 0s 1, ${bounceY1} ${
  //       gameLevel === 5 ? 4 : 2
  //     }s linear 0s 1,
  //     ${bounceX} ${
  //       gameLevel === 5 ? 5 : 6
  //     }s linear 3s infinite alternate, ${bounceY} ${
  //       gameLevel === 5 ? 4 : 4
  //     }s linear 2s infinite alternate;
  //     `,
  // const bounceStilesRight = {
  //   cursor: "pointer",
  //   position: gameLevel === 1 || gameLevel === 3 ? "" : "absolute",
  //   animation:
  //     gameLevel === 1 || gameLevel === 3
  //       ? "none"
  //       : `${bounceRightX} ${
  //           gameLevel === 5 ? 5 : 10
  //         }s linear 0s infinite alternate, ${bounceRightY} ${
  //           gameLevel === 5 ? 4 : 9
  //         }s linear 0s infinite alternate;`,
  // };

  return (
    <Stack id={"Animated-Stack"} onClick={handleClick} sx={bounceStiles}>
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
