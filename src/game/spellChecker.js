import { recognitionService } from "../recognition/recognition";
import { newLevel } from "../levelLogic/levelLogic";

export const spellChecker = async (txt) => {
  console.log(txt);
 
  console.log("recognitionService STARTED");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = recognitionService.getResult();
      console.log("results", result);
      if (result.includes(txt)) {
        //newLevel.speakText("PALABRA CORRECTA");
        console.log("PALABRA CORRECTA");
        resolve(true);
      } else {
        //newLevel.speakText("PALABRA INCORRECTA");
        console.log("recognitionService FINISHED");
        console.log("PALABRA INCORRECTA");
        resolve(false);
      }
    }, 3000);
  });
};
export const spellChecker1 = async (txt) => {
  console.log(txt);
  recognitionService.start();
  console.log("recognitionService STARTED");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = recognitionService.getResult();
      console.log("results", result);
      if (result.includes(txt)) {
        //newLevel.speakText("PALABRA CORRECTA");
        console.log("PALABRA CORRECTA");
        recognitionService.stop();
        resolve(true);
      } else {
        //newLevel.speakText("PALABRA INCORRECTA");
        console.log("recognitionService FINISHED");
        console.log("PALABRA INCORRECTA");
        recognitionService.stop();
        resolve(false);
      }
    }, 3000);
  });
};

export const textSpeaker=async(txt)=>{
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("textSpeaker",txt);
      newLevel.speakText(txt);
      resolve
    }, 3000);
  })
}

export const spellChecker2 = async (txt) => {
  console.log(txt);

  console.log("recognitionService STARTED");

  return new Promise(async (resolve) => {
    // Espera hasta que el reconocimiento esté listo
    await recognitionService.start();

    recognitionService.onresult = (event) => {
      const result = event.results[0][0].transcript;
      console.log("results", result);
      if (result.includes(txt)) {
        recognitionService.stop();
        resolve(true);
      } else {
        recognitionService.stop();
        resolve(false);
      }
    };
  });
};