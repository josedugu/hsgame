import { useState } from "react";
import { GameCard } from "./gameCard";

export const WordsContainer = ({
  words,
  newLevel,
  level,
  checkAnswer,
  showWords,
}) => {
  const [warning, setWarning] = useState([]);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const aspectRatio=screenWidth/screenHeight
  console.log(`aspect ratio ${aspectRatio} width ${screenWidth} heigth ${screenHeight}`);
  return (
    <div
      id="showWords-container"
      style={{
        display: showWords ? "flex" : "none",
        position: "relative",
        width: "100%",
        height: "90%",
        justifyContent: "center",
        alignItems: "center",
        border: "solid 1px green",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      {words &&
        words.map((word, index) => {
          return (
            <GameCard
              newLevel={newLevel}
              key={index}
              gameLevel={level}
              url={word?.image?.url}
              wordLevel={word.score[0]}
              name={word.name}
              setWarning={setWarning}
              checkAnswer={checkAnswer}
              screenWidth={screenWidth}
              screenHeight={screenHeight}
            />
          );
        })}
      {warning &&
        warning.length > 0 &&
        warning.map((_, index) => (
          <span
            key={index}
            className={`span-warning ${warning ? "animate" : ""}`}
          >
            😐
          </span>
        ))}
    </div>
  );
};
