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
  console.log(`${screenHeight} ${screenWidth}`);
  const direction = {
    x: Math.random() > 0.5 ? "left" : "rigth",
    y: Math.random() > 0.5 ? "top" : "bottom",
  }
  const position = {
    x: Math.random() * screenWidth,
    y: Math.random() * screenHeight,
  }
  console.log(position)

  const getKeyFrame = (direction, position) => {
    if(direction === "left") {
      return [
        keyframes`from { left: ${position.x - 50}px; } to { left: 0; }`,
        keyframes`from { left: 0 } to { left: calc(100% - 100px); }`,
      ]
    } else if(direction === "rigth") {
      return [
        keyframes`from { left: ${position.x - 50}px; } to { left: calc(100% - 100px); }`,
        keyframes`from { left: calc(100% - 100px) } to { left: 0; }`,
      ]
    }

    if(direction === "top") {
      return [
        keyframes`from { top: ${position.y - 50}px; } to { top: 0px; }`,
        keyframes`from { top: 0 } to { top: calc(100% - 100px); }`,
      ]
    } else if(direction === "bottom") {
      return [
        keyframes`from { top: ${position.y - 50}px; } to { top: calc(100% - 100px); }`,
        keyframes`from { top: calc(100% - 100px); } to { top: 0; }`,
      ]
    }
  }

  const [keyFrameX1, keyFrameX2] = getKeyFrame(direction.x, position)
  const [keyFrameY1, keyFrameY2] = getKeyFrame(direction.y, position)

  const getAnimation = (direction, position, keyframes) => {
    const distanceToEndX = direction.x === "rigth" ? screenWidth - position.x : position.x
    const distanceToEndY = direction.y === "bottom" ? screenHeight - position.y : position.y

    const minV = wordLevel === 3 ? 4 : 8
    const maxV = wordLevel === 3 ? 2 : 6

    const velocity = Math.random() * (maxV - minV)  + maxV
    
    const velocityX = velocity * screenHeight / screenWidth * (Math.random() * 0.3 + 1)
    const velocityY = velocity * screenWidth / screenHeight * (Math.random() * 0.3 + 1)

    const timeToEndX = distanceToEndX * velocityX / screenWidth
    const timeToEndY = distanceToEndY * velocityY / screenHeight

    const animationX1 = `${keyframes[0].x} ${timeToEndX}s linear 0s 1`
    const animationY1 = `${keyframes[0].y} ${timeToEndY}s linear 0s 1`
    const animationX2 = `${keyframes[1].x} ${velocityX}s linear ${timeToEndX}s infinite alternate`
    const animationY2 = `${keyframes[1].y} ${velocityY}s linear ${timeToEndY}s infinite alternate`
    return [animationX1, animationY1, animationX2, animationY2].join(", ")
  }
  /*
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
  */
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

  const bounceStiles = {
    cursor: "pointer",
    position: gameLevel === 1 || gameLevel === 3?"block":"absolute",
    animation:
      gameLevel === 1 || gameLevel === 3
        ? "none"
        : getAnimation(direction, position, [{
          x: keyFrameX1,
          y: keyFrameY1,
        }, {
          x: keyFrameX2,
          y: keyFrameY2,
        }]),
  };


  /*

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
        : `${bounceX1} 4s linear 0s 1, ${bounceY1} 3s linear 0s 1, 
    ${bounceX} 5s linear 4s infinite alternate, ${bounceY} 3s linear 3s infinite alternate`,
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
  */
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
