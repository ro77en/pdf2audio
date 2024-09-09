import { useRef, useContext, useState } from "react";

import pdfToText from "react-pdftotext";
import { franc } from "franc-min";

import { FileContext } from "../../App";
import Message from "../Message/Message";

import "./Converter.css";

function Converter() {
  const { file, setFile } = useContext(FileContext);
  const inputRef = useRef();
  const [audioUrl, setAudioUrl] = useState(null);
  const [audio, setAudio] = useState(null);

  const getSpeechLang = (detectedLang) => {
    const langMap = {
      eng: "en-US",
      por: "pt-BR",
      spa: "es-ES",
    };

    return langMap[detectedLang] || "en-US";
  };

  const handleFileSelection = (file) => {
    if (file && file.type === "application/pdf") {
      setFile(file);
    } else {
      setFile(undefined);
    }
  };

  const createAudioUrl = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);

    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(url);
    setAudio(newAudio);
  };


  const playAudio = () => {
    if (audio) {
      audio.play();
    }
  }

  const pauseAudio = () => {
    if (audio) {
      audio.pause();
    }
  }

  const fetchAudioFile = async (text, lang) => {
    try {
      const res = await fetch("http://localhost:3000/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          lang: lang,
        }),
      });

      if (!res.ok) {
        throw new Error('Error during the HTTP request')
      }

      const blob = await res.blob();
      createAudioUrl(blob);
    } catch (error) {
      console.log("Failed to convert text to audio file: " + error);
    }
  };

  const extractText = (file) => {
    pdfToText(file)
      .then((text) => {
        console.log(text);
        const detectedLang = franc(text);
        fetchAudioFile(text, getSpeechLang(detectedLang));
      })
      .catch((error) =>
        console.log("Failed to extract text from PDF: " + error)
      );
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFileSelection(files[0]);
  };

  const handleOnChange = (event) => {
    const files = event.target.files;
    handleFileSelection(files[0]);
  };

  const handleBrowseFile = () => {
    inputRef.current.click();
  };

  return (
    <>
      <div className="converter">
        <div
          className="dropzone"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          <div>
            <img
              src={`src/assets/${file ? "valid-pdf.png" : "add-pdf.png"}`}
              alt={`${file ? "valid pdf pic" : "add pdf pic"}`}
            />
            <h2>
              {file ? `PDF Ready: ${file.name}` : "Drag & Drop your PDF File"}
            </h2>
            {file ? <p>or drag another PDF here</p> : <p>or</p>}
            <input
              type="file"
              name="file"
              id="file"
              hidden
              onChange={handleOnChange}
              ref={inputRef}
            />
            {file ? (
              <>
                <button onClick={() => extractText(file)}>Convert PDF</button>
                {audioUrl && (
                  <audio controls src={audioUrl}></audio>
                )}
              </>
            ) : (
              <button onClick={handleBrowseFile}>Browse Files</button>
            )}
          </div>
        </div>
      </div>
      <Message file={file} />
    </>
  );
}

export default Converter;
