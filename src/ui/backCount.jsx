import { Typography } from "@mui/material";
import { useState, useEffect } from "react";


const Countdown = () => {
  const [count, setCount] = useState(1); // Iniciamos la cuenta regresiva en 3
  useEffect(() => {
    //setTimeout(() => {}, 2000);
    const interval = setInterval(() => {
      if (count === 0) {
        clearInterval(interval);
      } else {
        setCount(count - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  return (
    <div>
      <Typography variant="h1" color={"#FFFFFF"}>
        {count}
      </Typography>
    </div>
  );
};

Countdown.displayName = "Countdown";
export default Countdown;
