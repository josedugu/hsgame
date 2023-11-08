import { Typography } from "@mui/material";
import { useState, useEffect } from "react";


const Countdown = () => {
  const [count, setCount] = useState(7); // Iniciamos la cuenta regresiva en 3
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
    
      <Typography variant="h1" sx={{
        width:"100%",
        height:"90dvh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        border:"solid 1px blue"
      }}>
        {count}
      </Typography>
    
  );
};

Countdown.displayName = "Countdown";
export default Countdown;
