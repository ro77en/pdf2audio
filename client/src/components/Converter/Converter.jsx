import { useRef, useContext, useState } from "react";

import pdfToText from "react-pdftotext";
import { franc } from "franc-min";

import { FileContext } from "../../App";
import Message from "../Message/Message";

import "./Converter.css";

function Converter() {
  const { file, setFile } = useContext(FileContext);
  const inputRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speech, setSpeech] = useState(null);

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

  const createSpeech = (text, detectedLang) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = getSpeechLang(detectedLang);
    speech.onend = () => setIsPlaying(false);
    return speech;
  };

  const playAudio = () => {
    if (speech && !isPlaying) {
      window.speechSynthesis.speak(speech);
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
  };

  const extractText = (file) => {
    pdfToText(file)
      .then((text) => {
        console.log(text);
        const detectedLang = franc(text);
        const speechObj = createSpeech(text, detectedLang);
        setSpeech(speechObj);
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
                {speech && (
                  <div>
                    {isPlaying ? (
                      <button onClick={pauseAudio}>Pause</button>
                    ) : (
                      <button onClick={playAudio}>Play</button>
                    )}
                  </div>
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
