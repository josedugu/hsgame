import { createTheme } from "@mui/material"

export const myTheme=createTheme({
    typography:{
        h4:{
            '@media (max-width:600px)': {
                fontSize: '24px',
              },
              '@media (min-width:960px)': {
                fontSize: '30px',
              },
        }
    }
})