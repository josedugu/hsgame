import "./gameCard.css";
import { Avatar, Stack } from "@mui/material";
import { keyframes } from "@mui/system";
import { useRef } from "react";
import GameDialog from "./gameDialog";
import { useTheme } from "@mui/material";
export const GameCard = ({
  newLevel,
  url,
  name,
  gameLevel,
  wordLevel,
  checkAnswer,
  setWarning,
  screenHeight,
  screenWidth,
}) => {
  const dialogRef = useRef();
  const theme = useTheme()
  let elementSize=100;
  if (screenWidth<=900) {
    elementSize=50;
  }
  //console.log(`${screenHeight} ${screenWidth}`);
  const direction = {
    x: Math.random() > 0.5 ? "left" : "rigth",
    y: Math.random() > 0.5 ? "top" : "bottom",
  };
  const position = {
    x: (Math.random() * screenWidth),
    y: (Math.random() * (screenHeight*0.9))-elementSize,
  };
  //console.log(position , name);

  const getKeyFrame = (direction, position) => {
    //console.log(position,direction, name);
    if (direction.x>screenWidth) {
      direction.x=screenWidth-elementSize
    }
    if (direction.y>screenHeight) {
      direction.y=screenHeight-elementSize
    }
    if (direction.y<(screenHeight*0.1)) {
      direction.y=screenHeight*0.1+elementSize
    }
    if (direction === "left") {
      return [
        keyframes`from { left: ${(position.x)}px; } to { left: 0; }`,
        keyframes`from { left: 0 } to { left: calc(100% - ${elementSize}px); }`,
      ];
    } else if (direction === "rigth") {
      return [
        keyframes`from { left: ${
          (position.x)
        }px; } to { left: calc(100% - ${elementSize}px); }`,
        keyframes`from { left: calc(100% - ${elementSize}px) } to { left: 0; }`,
      ];
    }

    if (direction === "top") {
      return [
        keyframes`from { top: ${(position.y)}px; } to { top: 0px; }`,
        keyframes`from { top: 0 } to { top: calc(100% - ${elementSize}px); }`,
      ];
    } else if (direction === "bottom") {
      return [
        keyframes`from { top: ${
          (position.y)
        }px; } to { top: calc(100% - ${elementSize}px); }`,
        keyframes`from { top: calc(100% - ${elementSize}px); } to { top: 0; }`,
      ];
    }
  };

  const [keyFrameX1, keyFrameX2] = getKeyFrame(direction.x, position, name);
  const [keyFrameY1, keyFrameY2] = getKeyFrame(direction.y, position, name);

  const getAnimation = (direction, position, keyframes) => {
    const distanceToEndX =
      direction.x === "rigth" ? screenWidth - position.x : position.x;
    const distanceToEndY =
      direction.y === "bottom" ? screenHeight - position.y : position.y;

    const minV = wordLevel === 5 ? 4 : 10;
    const maxV = wordLevel === 5 ? 2 : 8;

    const velocity = Math.random() * (maxV - minV) + maxV;
    const velocity1 =( Math.random() * (maxV - minV) + maxV);
    const velocity2 = Math.random() * (maxV - minV) + maxV;
  
    
    const velocidadX= (screenWidth/velocity)+ (Math.random());
    const velocidadY= (screenHeight/velocity)+ (Math.random());

    // console.log(
    //   `
    //   velocidad actual X ${velocidadX}
    //   velocidad actual Y ${velocidadY}
    //   `
    // );

    // const velocityX =
    //   ((velocity * screenHeight) / screenWidth) * (Math.random() * 0.3 + 1);
    // const velocityY =
    //   ((velocity * screenWidth) / screenHeight) * (Math.random() * 0.3 + 1);

    // const timeToEndX = velocityX;
    // const timeToEndY = velocityY;
    // const timeToEndX = (distanceToEndX * velocityX) / screenWidth;
    // const timeToEndY = (distanceToEndY * velocityY) / screenHeight;

    const tiempoFinX=distanceToEndX/ velocidadX;
    const tiempoFinY=distanceToEndY/velocidadY;

    // console.log(
    //   `
    //   ${name}
    //   tiempo para finalizar actual X ${tiempoFinX}
    //   tiempo para finalizar actual Y ${tiempoFinY}
    //   `
    // );

    // const animationX1 = `${keyframes[0].x} ${timeToEndX}s linear 0s 1`;
    // const animationY1 = `${keyframes[0].y} ${timeToEndY}s linear 0s 1`;
    // const animationX2 = `${keyframes[1].x} ${velocity1}s linear ${timeToEndX}s infinite alternate`;
    // const animationY2 = `${keyframes[1].y} ${velocity2}s linear ${timeToEndY}s infinite alternate`;

    const animationX1 = `${keyframes[0].x} ${tiempoFinX}s linear 0s 1`;
    const animationY1 = `${keyframes[0].y} ${tiempoFinY}s linear 0s 1`;
    const animationX2 = `${keyframes[1].x} ${velocity1}s linear ${tiempoFinX}s infinite alternate`;
    const animationY2 = `${keyframes[1].y} ${velocity2}s linear ${tiempoFinY}s infinite alternate`;
    return [animationX1, animationY1, animationX2, animationY2].join(", ");
  };

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
    position: gameLevel === 1 || gameLevel === 3 ? "block" : "absolute",
    animation:
      gameLevel === 1 || gameLevel === 3
        ? "none"
        : getAnimation(direction, position, [
            {
              x: keyFrameX1,
              y: keyFrameY1,
            },
            {
              x: keyFrameX2,
              y: keyFrameY2,
            },
          ]),
  };
  return (
    <Stack id={"Animated-Stack"} onClick={handleClick} sx={bounceStiles}>
      <Avatar alt={name} src={url} sx={{ width: "100px", height: "100px",
      [theme.breakpoints.down('md')]:{
        width: "50px", height: "50px",
      }
    }} />
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
