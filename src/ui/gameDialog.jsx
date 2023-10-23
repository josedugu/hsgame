import { forwardRef, useImperativeHandle, useState } from "react";
import Img from "./Img";
import cat from "./assets/cat.jpg";
import { Stack, Dialog } from "@mui/material";

const GameDialog = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [resolved, setResolved] = useState(false);

  const { name, url, goldWord, nextWord } = props;

  const openDialog = () => {
    setIsOpen(true);

    const timer = setTimeout(() => {
      console.log("Revisando respuesta de", name);
      console.log("Resolved", resolved);
      closeDialog();
    }, 10000);
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "es-ES";
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript.includes(name)) {
        console.log("respuesta correcta");
        clearTimeout(timer);
        setResolved(true);
        recognition.stop();
        goldWord(name);
      }
    };
    recognition.onerror = (event) => {
      console.error("Error en reconocimiento de voz:", event.error);
    };
    recognition.onend = () => {
      console.log("Fin de la transcripción");
      ////ANIMACION PARA REFORZAR SI ACIERTA LA PALABRA
      setTimeout(() => {
        closeDialog();
        nextWord();
      }, 1000);
    };
    recognition.start();
  };

  // Función para cerrar el diálogo desde fuera del componente
  const closeDialog = (_, r) => {
    //console.log(r);
    if (r === "backdropClick") return;
    setIsOpen(false);
  };

  // Expone las funciones para abrir y cerrar el diálogo
  useImperativeHandle(ref, () => ({
    openDialog,
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
