const url = "https://hs-mock-api-amb7.vercel.app/updateWord";
///const url='http://127.0.0.1:3001/updateWord';

export const changeWordLevel = (word, studentKey) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
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
