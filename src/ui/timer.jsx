import AlarmIcon from "@mui/icons-material/Alarm";
import {Typography,Stack,useTheme} from "@mui/material";


import { forwardRef, useImperativeHandle, useState, useEffect } from "react";

const Timer = forwardRef((props, ref) => {
  const { newLevel, setShowEndScreen, setShowWords } = props;
  const [time, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const theme =useTheme()

  const exposedFunctions ={
    start:()=>{setIsRunning(true)},
    //getTime:()=>{setTime(time)},
    checkAnswer:(name,wordLevel)=>{
      console.log(`Data recibida name ${name} wordLevel ${wordLevel}`);
      return newLevel?.answerChecker(name, time, wordLevel);}
  }

  useImperativeHandle(ref, () =>exposedFunctions);

  useEffect(() => {
    const gameFinished = newLevel?.endGame();
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }
    if (time === 60|| gameFinished) {
      console.log("Hemos finalizado");
      setIsRunning(false);
      newLevel?.endGame();
      newLevel?.end();
      setShowEndScreen(true);
      setShowWords(false);
      setTimer(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, time, newLevel,setShowEndScreen,setShowWords]);

 

  return (
    <Stack direction="row" alignItems="center">
      <AlarmIcon
        //onClick={() => newLevel?.getUnknown()}
        fontSize="large"
        sx={{ color: "white" }}
      />
      <Typography sx={{
        [theme.breakpoints.down('md')]:{
          fontSize:"24px"
        }
      }} variant="h4"> : {time || "00"}</Typography>
    </Stack>
  );
});

Timer.displayName = "Timer";

export default Timer;
