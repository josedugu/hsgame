import { forwardRef, useImperativeHandle, useState } from "react";
import Img from "./Img";
import cat from "./assets/cat.jpg";
import { Stack, Dialog } from "@mui/material";

const GameDialog = forwardRef((props, ref) => {
  const { name, url, goldWord, nextWord, spoken, setSpoken } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [timer, setTimer] = useState(null);
  const [recognition, setRecognition] = useState(new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)());
    //console.log("ESTOY INICIANDO GAME DIALOG", name);

  //   useEffect(() => {
  //     ///console.log("CREANDO DIALOG", name);
  //     let timer
  //     if (isOpen) {
  //       timer = setTimeout(() => {
  //         //console.log("Revisando respuesta de", name);
  //         console.log("SE ACABO EL TIEMPO", name);
  //         goldWord(name, "silver", url);
  //         setIsOpen(false);
  //       }, 10000);

  //     const recognition = new (window.SpeechRecognition ||
  //       window.webkitSpeechRecognition)();
  //     recognition.lang = "es-ES";
  //     recognition.interimResults = true;
  //     recognition.onresult = (event) => {
  //       const transcript = event.results[0][0].transcript;
  //       if (transcript.includes(name)) {
  //         if (!resolved) {
  //           console.log("respuesta correcta");
  //           ///goldWord(name, "gold", url);
  //           setResolved(true);
  //         }
  //         recognition.stop();
  //         clearTimeout(timer);
  //         setTimeout(() => {
  //           setIsOpen(false);
  //         }, 1000);
  //         //clearTimeout(timer);
  //       }
  //     };
  //     recognition.onerror = (event) => {
  //       console.error("Error en reconocimiento de voz:", event.error);
  //     };
  //     recognition.onend = () => {
  //       console.log("EJECUTANDO ON END", name);
  //     };
  //     setRecognition(recognition);
  //     recognition?.start();
  //     return () => {
  //       recognition.stop();
  //     };

  // }}, [isOpen]);

  recognition.lang = "es-ES";
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (transcript.includes(name)) {
      recognition.stop();
      if (!resolved) {
        goldWord(name, "gold", url);
        setResolved(true);
      }
      clearTimeout(timer);
      setSpoken(true)
      if (!spoken) {
        setTimeout(() => {
          setIsOpen(false);
          nextWord();
          //console.log("respuesta correcta",name);
          //console.log("spoken", spoken);
        }, 1000);
      }
     
      //clearTimeout(timer);
    }
  };
  recognition.onerror = (event) => {
    console.error("Error en reconocimiento de voz:", event.error);
  };
  recognition.onend = () => {
    //console.log("EJECUTANDO ON END", name);
  };

  const openDialogFunction = () => {
    recognition?.start();
    setIsOpen(true);
    setTimer(
      setTimeout(() => {
        goldWord(name, "silver", url);
        console.log("ejecutando new timeout");
        setIsOpen(false);
        recognition.stop();
        nextWord();
      }, 7000)
    );
  };

  const closeDialog = (_, r) => {
    //console.log(r);
    if (r === "backdropClick") return;
    setIsOpen(false);
  };

  // Expone las funciones para abrir y cerrar el diálogo
  useImperativeHandle(ref, () => ({
    openDialogFunction,
    closeDialog,
  }));

  return (
    <Dialog open={isOpen} onClose={closeDialog}>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          p: "16px 16px",
          gap: "8px",
          cursor: "pointer",
          bgcolor: `${resolved ? "#facc6b" : "#bdd4e7"}`,
          backgroundImage: `${
            resolved
              ? "linear-gradient(315deg, #facc6b 0%, #fabc3c 74%)"
              : "linear-gradient(315deg, #bdd4e7 0%, #8693ab 74%)"
          }`,
          transition: "background-color 1s ease",
        }}
      >
        <div>
          <h1
            style={{
              color: resolved ? "#332C1D" : "AppWorkspace",
              textTransform: "capitalize",
            }}
          >
            {name}
          </h1>
          <span style={{ display: resolved ? "flex" : "none" }}>✅✅✅</span>
        </div>
        <Img width={300} src={url} fallbackSrc={cat} alt={name} />
      </Stack>
    </Dialog>
  );
});
GameDialog.displayName = "gameDialog";
export default GameDialog;
