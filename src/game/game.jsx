import { useEffect, useState } from "react";
import "./game.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Drawer,
  Dialog,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Face6Icon from "@mui/icons-material/Face6";
import AlarmIcon from "@mui/icons-material/Alarm";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import { CardLevel } from "../ui/levelCard";
import { levels } from "../ui/levels";
import { Cellphone } from "../ui/cellphone";
import Countdown from "../ui/backCount";
import { GameCard } from "../ui/gameCard";
import { newLevel } from "../levelLogic/levelLogic";
import cat from "../ui/assets/cat.jpg";
import Img from "../ui/Img";
import { Logros } from "../ui/logros";
import { mockData } from "../data/data";
import { EndScreen } from "../ui/endScreen";
import { recognitionService } from "../recognition/recognition";

export const Game = () => {
  ///STATES
  const [drawer, setDrawer] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenOrientation, setScreenOrientation] = useState(0);
  const [level, setLevel] = useState(0);
  const [showCounter, setShowCounter] = useState(false);
  const [showWords, setShowWords] = useState(false);
  const [words, setWords] = useState(null);
  const [warning, setWarning] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [showLogros, setShowLogros] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);

  if (openDialog) {
    recognitionService.start();
    const result = recognitionService.getResult();

    if (dialogData?.name.toLowerCase() === result.toLowerCase()) {
      newLevel.isGold(dialogData?.name);
    }
    setTimeout(() => {
      recognitionService.stop();
      setOpenDialog(false);
    }, 3000);
  }

  ///FUNCTIONS
  const startTimer = () => {
    setIsRunning(true);
  };

  ////EFFECTS
  useEffect(() => {
    const gameFinished = newLevel.endGame();
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    if (time === 60 || gameFinished) {
      setIsRunning(false);
      newLevel.endGame();
      newLevel.end();
      setShowEndScreen(true);
      setShowWords(false);
      setTime(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, time]);

  useEffect(() => {
    if (level > 0) {
      const words = newLevel.getWords(level);
      setWords(words);
    }
  }, [level]);

  useEffect(() => {
    const updateScreenWidth = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
    };

    const updateScreenOrientation = () => {
      const orientation = window.screen.orientation.angle;
      setScreenOrientation(orientation);
    };

    updateScreenWidth();
    updateScreenOrientation();

    window.addEventListener("resize", updateScreenWidth);
    window.addEventListener("orientationchange", updateScreenOrientation);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
      window.removeEventListener("orientationchange", updateScreenOrientation);
    };
  }, [level]);

  return (
    <div className="game-main-container">
      <Drawer
        anchor="right"
        open={showLogros}
        onClose={() => setShowLogros(false)}
      >
        <Logros array={mockData} />
      </Drawer>

      <Drawer open={drawer}>
        <IconButton onClick={() => setDrawer(false)}>
          <CloseIcon />
        </IconButton>
        <Typography>HolaMundo</Typography>
      </Drawer>

      <AppBar
        position="static"
        sx={{
          height: "8%",
          bgcolor: "transparent",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          p: "0px 16px",
        }}
      >
        {level < 1 ? "Menor a 1" : "Mayor a 1"}
        <IconButton
          sx={{ display: { sm: "flex", md: "none" } }}
          onClick={() => setDrawer(true)}
        >
          <SportsEsportsIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>

        <Toolbar sx={{ gap: "16px" }}>
          <IconButton
            color="primary"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <SportsEsportsIcon fontSize="large" sx={{ color: "white" }} />
          </IconButton>
          <IconButton
            color="primary"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Face6Icon fontSize="large" sx={{ color: "white" }} />
          </IconButton>
          <Stack direction="row" alignItems="center">
            <AlarmIcon
              onClick={() => newLevel.getUnknown()}
              fontSize="large"
              sx={{ color: "white" }}
            />
            <Typography variant="h4"> : {time || "00"}</Typography>
          </Stack>
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
        <IconButton
          color="primary"
          sx={{
            display: { xs: "none", md: "flex" },
            width: "48px",
            height: "48px",
          }}
        >
          <ExitToAppIcon fontSize="large" color="warning" />
        </IconButton>
      </AppBar>
      <EndScreen
        show={showEndScreen}
        setLevel={setLevel}
        setShowEndScreen={setShowEndScreen}
      />
      <Stack
        sx={{
          display: showCounter ? "flex" : "none",
          width: "100%",
          height: "90%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {showCounter?(<Countdown />):""}
        
      </Stack>
      <Stack
        sx={{
          display: showWords ? "flex" : "none",
          width: "100%",
          height: "90%",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          border: "solid 1px white",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {words &&
          words.map((word, index) => (
            <GameCard
              key={index}
              gameLevel={level}
              url={word.url}
              wordLevel={word.level}
              name={word.name}
              setWarning={setWarning}
              setOpenDialog={setOpenDialog}
              setDialogData={setDialogData}
              time={time}
            />
          ))}
        <span className={`span-warning ${warning ? "animate" : ""}`}>😐</span>
        <Dialog open={openDialog}>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              p: "16px 16px",
              gap: "8px",
              cursor: "pointer",
              backdropFilter: "blur(16px) saturate(180%)",
              bgcolor: "rgba(17, 25, 40, 0.75)",
            }}
          >
            <h1>{dialogData?.name}</h1>
            <Img
              width={300}
              src={"https://giphy.com/embed/11c7UUfN4eoHF6"}
              fallbackSrc={cat}
              alt={dialogData?.name}
            />
          </Stack>
        </Dialog>
      </Stack>
      <Stack
        sx={{
          display:
            screenOrientation === 0 && screenWidth < 600 ? "flex" : "none",
          width: "100%",
          height: "90%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Cellphone />
      </Stack>
      <Stack
        sx={{
          display: screenWidth < 600 ? "none" : level < 1 ? "flex" : "none",
        }}
        direction={"row"}
        gap={"40px"}
        p={"16px 32px"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"90%"}
        width={"100%"}
        flexWrap={"wrap"}
      >
        {levels &&
          levels.map((level, index) => (
            <CardLevel
              key={index}
              cardImg={level.cardImg}
              avt={level.avt}
              setter={setLevel}
              level={level.level}
              setCanvas={setShowWords}
              showCounter={setShowCounter}
              startTimer={startTimer}
            />
          ))}
      </Stack>
    </div>
  );
};
