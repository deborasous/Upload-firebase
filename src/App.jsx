import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import "./App.css";
import { storage } from "./firebase";

function App() {
  const [imgURL, setImgURL] = useState("");
  const [progress, setProgress] = useState(0);

  //pegar a imagem
  const handleUpload = (event) => {
    event.preventDefault(); //evita que faça upload automatico

    // selecionar a imagem do computador
    const file = event.target[0]?.files[0];
    //validar se a imagem foi carregada
    if (!file) return;

    // storage é a referencia da variavel dentro do arquivo firebaseError.js
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    //o snapshot vai contar a porcentagem de progresso de upload do arquivo
    //o progress vai progetar o tempo de uploado do arquivo
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },

      //gera a url da image para mostrar em tela e subir para o firebase
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgURL(url);
        });
      }
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleUpload}>
          <input type="file" />
          <button type="submit">Enviar</button>
        </form>
        <br />
        {/* quando não tiver uma imagem, mostra progresso */}
        {!imgURL && <progress value={progress} max="100" />}
        {/* se tiver imagem, mostrar em tela */}
        {imgURL && <img src={imgURL} alt="Imagem" width={250} />}
      </header>
    </div>
  );
}

export default App;
