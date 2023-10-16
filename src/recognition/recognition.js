class SpeechRecognitionService {
  constructor() {
    this.recognition = null;
    this.transcript = "";
    this.listening = false;
    this.words = [];
    this.initRecognition();
  }

  initRecognition() {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      this.recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      this.recognition.lang = "es-ES";

      this.recognition.interimResults = true;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.transcript = transcript;
        //this.words.push(transcript);
        //this.showWords();
      };
      this.recognition.onerror = (event) => {
        console.error("Error en reconocimiento de voz:", event.error);
      };
      this.recognition.onend = () => {
        console.log("Fin de la transcripción");
        this.listening = false;
      };
    } else {
      console.error("El navegador no admite la API de reconocimiento de voz.");
    }
  }

  start() {
    if (!this.listening) {
      this.recognition.start();
      this.listening = true;
    }
  }

  stop() {
    if (this.listening) {
      this.recognition.stop();
      this.listening = false;
    }
  }

  getResult() {
    return this.transcript;
  }
  showWords() {
    console.log("Palabras reconocidas:", this.words);
  }
}

// Uso de la clase
export const recognitionService = new SpeechRecognitionService();

// Para iniciar la escucha
//recognitionService.start();

// Para detener la escucha
//recognitionService.stop();

// Para obtener el resultado de la transcripción
//const result = recognitionService.getResult();
//console.log('Texto transcribido:', result);
