import { IconButton, Stack, Toolbar, Typography } from "@mui/material"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Face6Icon from "@mui/icons-material/Face6";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useRef } from "react";

export const GameAppBar=({newLevel,Timer,setShowEndScreen,setShowWords,setShowLogros})=>{
    const timerRef= useRef()
    return (
        <Toolbar sx={{ gap: "16px" }}>
          <IconButton
            color="primary"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <SportsEsportsIcon fontSize="large" sx={{ color: "white" }} />
          </IconButton>
          <IconButton
            onClick={() => newLevel?.getSolvedWords()}
            color="primary"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Face6Icon fontSize="large" sx={{ color: "white" }} />
          </IconButton>
          <Timer
            ref={timerRef}
            newLevel={newLevel}
            setShowEndScreen={setShowEndScreen}
            setShowWords={setShowWords}
          />
          <Stack
            direction="row"
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <IconButton color="primary" onClick={() => setShowLogros(true)}>
              <EmojiEventsIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>

            <Typography variant="h4"> : 77</Typography>
          </Stack>
        </Toolbar>
    )
}