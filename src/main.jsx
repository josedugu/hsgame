import ReactDOM from "react-dom/client";
import { Game } from "./game/game";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { myTheme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={myTheme}>
    <Game />
  </ThemeProvider>
);
