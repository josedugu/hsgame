import { createTheme } from "@mui/material"

export const myTheme=createTheme({
    typography:{
        h4:{
            '@media (max-width:600px)': {
                fontSize: '24px', // Tamaño para pantallas pequeñas (menos de 600px de ancho)
              },
              '@media (min-width:960px)': {
                fontSize: '30px', // Tamaño para pantallas medianas y grandes (más de 960px de ancho)
              },
        }
    }
})