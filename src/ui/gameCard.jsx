import "./gameCard.css";
import { Avatar, Stack } from "@mui/material";
import { keyframes } from "@mui/system";

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
  index,
}) => {
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
        let hasSpoken = false;

        const rec = setTimeout(() => {
          console.log("FIN DEL INTENTO"), recognition.stop();
          closeDialog();
          newLevel.speak();
        }, 10000);

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          console.log(transcript);
          ///EL INTERVAL SE ACTUALIZA CADA SEGUNDO AL PARECER PORQUE EL PADRE TAMBIEN LO HACE
          ///NECESITO HACER UNA VALIDACION CADA CIERTO TIEMPO PARA CREAR LOS INTENTOS
          // const int= setInterval(() => {
          //   if (transcript.includes(name) && !hasSpoken) {
          // console.log("respuesta correcta en interval");
          //   }else{
          //     console.log("respuesta INcorrecta en interval");
          //   }
          // }, 5000);
          if (transcript.includes(name) && !hasSpoken) {
            clearTimeout(rec);
            //clearInterval(int)
            recognition.stop();
            closeDialog();
            newLevel.speak();
            hasSpoken = true;
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
  //console.log(`The game level for ${name} is ${gameLevel}`);
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
    </Stack>
  );
};
