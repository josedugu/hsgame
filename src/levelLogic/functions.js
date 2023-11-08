///const url = "https://hs-mock-api-amb7.vercel.app/";
const url='http://127.0.0.1:3001/';

export const changeWordLevel = (word, studentKey) => {
  const urlupdateWord= url+"updateWord";
  return new Promise((resolve, reject) => {
    fetch(urlupdateWord, {
      method: "POST",
      body: JSON.stringify({
        addWords:word,
        studentKey,
      }),
    })
      .then((response) => {
        if (response.ok) {
          //console.log("WORD UPDATED");
          resolve(response); // Resuelve la promesa si la respuesta es exitosa
        } else {
          console.warn("WORD WASN'T UPDATED");
          reject(response); // Rechaza la promesa si la respuesta no es satisfactoria
        }
      })
      .catch((err) => {
        reject(err); // Rechaza la promesa si ocurre un error en la solicitud
      });
  });
};

export const updateStudentGameLevel = (studentKey) => {
  const updateStudentGameLevel= url+"updateStudentGameLevel";
  return new Promise((resolve, reject) => {
    fetch(updateStudentGameLevel, {
      method: "POST",
      body: JSON.stringify({
        studentKey,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("updateStudentGameLevel UPDATED");
          resolve(response); // Resuelve la promesa si la respuesta es exitosa
        } else {
          console.warn("updateStudentGameLevel WASN'T UPDATED");
          reject(response); // Rechaza la promesa si la respuesta no es satisfactoria
        }
      })
      .catch((err) => {
        reject(err); // Rechaza la promesa si ocurre un error en la solicitud
      });
  });
};
