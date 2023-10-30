import { useEffect, useState, useRef } from "react";
import "./game.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Drawer,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Face6Icon from "@mui/icons-material/Face6";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import { CardLevel } from "../ui/levelCard";
import { levels } from "../ui/levels";
import { Cellphone } from "../ui/cellphone";
import Countdown from "../ui/backCount";
import { WordsContainer } from "../ui/wordsContainer";
import { Logros } from "../ui/logros";
import { EndScreen } from "../ui/endScreen";
import { getData, LevelLogic } from "../levelLogic/levelLogic";
import Timer from "../ui/timer";

export const Game = () => {
  ///STATES
  const [drawer, setDrawer] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenOrientation, setScreenOrientation] = useState(0);
  const [level, setLevel] = useState(0);
  const [newLevel, setNewLevel] = useState(null);
  const [allowedLevels, setAllowedLevels] = useState(null);
  const [showCounter, setShowCounter] = useState(false);
  const [showWords, setShowWords] = useState(false);
  const [words, setWords] = useState(null);
  const [allWords, setAllWords] = useState(null);
  const [showLogros, setShowLogros] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);

  const timerRef = useRef();
  // const angle = (2 * Math.PI) / numChildren;
  // const radius = 80;
  ///FUNCTIONS
  const startTimer = () => {
    timerRef.current.start();
  };
  const checkAnswer = (name, wordLevel) => {
    return timerRef.current.checkAnswer(name, wordLevel);
  };

  useEffect(() => {
    const data = getData(
      "https://hs-mock-api-amb7-72yphm920-josedugu.vercel.app/12345/level"
    )
      .then((res) => {
        console.log("DATA OBTENIDA", data), setNewLevel(new LevelLogic(res));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (level > 0) {
      const words = newLevel.getWords(level);
      setWords(words);
    }
  }, [level, newLevel]);

  useEffect(() => {
    const words = newLevel?.getAllWords();
    const allowedLevels = newLevel?.getAllowedLevels();

    setAllWords(words);
    setAllowedLevels(allowedLevels);
  }, [allWords, newLevel]);

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
        <Logros array={allWords} />
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
            onClick={() => newLevel?.getData()}
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
        newLevel={newLevel}
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
        {showCounter ? <Countdown /> : ""}
      </Stack>
    
       {showWords && 
        <WordsContainer
          words={words}
          newLevel={newLevel}
          level={level}
          showWords={showWords}
          checkAnswer={checkAnswer}
        />}
    
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
              allowedLevels={allowedLevels}
              key={index}
              newLevel={newLevel}
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
