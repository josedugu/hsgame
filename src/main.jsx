import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { myTheme } from "./theme";
import { App } from "./app";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={myTheme}>
    <App />
  </ThemeProvider>
);
