//import { mockData } from "../data/data";
export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener datos de la API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export class LevelLogic {
  constructor(data) {
    this.data=data
    this.allowedLevels=data.gameLevel
    this.gold = data.words.filter((word) => word.score[0] === "gold");
    this.silver = data.words.filter((word) => word.score[0] === "silver");
    this.unknown = data.words.filter((word) => word.score[0] === "unknown");
    this.allWords = data.words;
    this.speaker = window.speechSynthesis;
    this.counter = 0;
    this.errors = 0;
    this.score = 0;
    this.solvedWords = [];
    this.gameWords = [];
    this.currentLevel = 0;
  }
  getData(){
    console.log(this.data);
  }
  getAllWords() {
    return this.allWords;
  }
  getAllowedLevels() {
    return this.allowedLevels;
  }
  getWords(level) {
    this.currentLevel = level;
    ////QUE PASA CUANDO EL ARRAY GOLD/SILVER ESTA VACIO? COMO SE ESTABLECE EL NIVEL 1?
    ///Por defecto usa las palabras que alcance
    this.gold.sort(() => Math.random() - 0.5);
    this.silver.sort(() => Math.random() - 0.5);
    console.log(level);
    if (level < 3) {
      const words = [
        ...this.gold.slice(0, 5),
        ...this.silver.slice(0, 2),
        ...this.unknown.slice(0, 3),
      ];
      this.gameWords = [...words];
      return words;
    } else if (level > 2) {
      const words = [
        ...this.gold.slice(0, 5),
        ...this.silver.slice(0, 4),
        ...this.unknown.slice(0, 6),
      ];
      this.gameWords = [...words];
      return words;
    } else {
      // Manejo para otros casos si es necesario
      console.log("otros casos");
      return [];
    }
  }
  speak() {
    if (this.gameWords.length !== this.counter) {
      console.log("LLAMANDO SPEAK");
      const utterThis = new SpeechSynthesisUtterance(
        this.gameWords[this.counter].name
      );
      utterThis.lang = "es-ES";
      this.speaker.speak(utterThis);
    } else {
      const utterThis = new SpeechSynthesisUtterance("Hemos finalizado");
      utterThis.lang = "es-ES";
      this.speaker.speak(utterThis);
    }
  }
  speakText(txt) {
    const utterThis = new SpeechSynthesisUtterance(txt);
    utterThis.lang = "es-ES";
    utterThis.onend = () => {
      this.speaker.cancel();
    };
    this.speaker.speak(utterThis);
  }
  stopSpeaking(){
    this.speaker.pause();
    this.speaker.cancel();
  }
  answerChecker(txt, time, level) {
    console.log(txt, time, level);
    if (txt === this.gameWords[this.counter].name) {
      if (level === "unknown") {
        this.solvedWords.push({ name: txt, level: "silver" });
      }
      this.counter++;
      this.score = this.score + (60 - time) * this.currentLevel;
      ///API POST
      //this.speak();
      return true;
    } else {
      this.errors--;
      console.log("Palabra incorrecta");
      return false;
    }
  }
  isGold(txt) {
    this.solvedWords.forEach((word) => {
      if (word.name === txt) {
        word.level = "gold";
      }
    });
  }
  endGame() {
    //console.log(this.counter);
    if (this.counter > 0) {
      return this.gameWords.length === this.counter;
    } else {
      return false;
    }
  }
  end() {
    if (this.gameWords.length > 0 && this.solvedWords.length > 0) {
      this.unknown = this.unknown.filter(
        (itemU) => !this.solvedWords.some((itemS) => itemS.name === itemU.name)
      );
      return true;
    } else {
      return false;
    }
  }
  getUnknown() {
    console.log(this.unknown);
  }
  getResult() {
    return { words: this.solvedWords, score: this.score };
  }
  newGame() {
    this.counter = 0;
    this.errors = 0;
    this.score = 0;
    this.solvedWords = [];
    this.gameWords = [];
    this.currentLevel = 0;
  }
}

