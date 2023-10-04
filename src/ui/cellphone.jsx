import { Stack } from "@mui/material";
import cellphone from "./assets/cellphone.png";
import "./cellphone.css";
export const Cellphone = () => {
  return (
    <Stack className="cell-main-container">
      <img src={cellphone} alt="cellphone" />
    </Stack>
  );
};
