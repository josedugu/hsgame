//import { mockData } from "../data/data";

export class GameLogic {
  constructor(words) {
    this.words = words;
    this.speaker = window.speechSynthesis;
    this.counter = 0;
    this.resolvedWords=[];
  }
  speak() {
    if (this.words.length!==this.counter) {
        const utterThis = new SpeechSynthesisUtterance(this.words[this.counter]);
        utterThis.lang = "es-ES";
        this.speaker.speak(utterThis);
        this.counter++;
    } else {
        const utterThis = new SpeechSynthesisUtterance("Hemos finalizado");
        utterThis.lang = "es-ES";
        this.speaker.speak(utterThis);
    }
  }
  answerChecker(txt){
    if (txt===this.words[this.counter]) {
      this.resolvedWords.push(txt)
    }else{
      console.log("Palabra incorrecta");
    }
  }
}

// const words = mockData.map((data) => data.name);
// export const newGame = new GameLogic(words);
