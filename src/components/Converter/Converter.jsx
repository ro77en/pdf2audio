import { useRef, useContext } from "react";

import pdfToText from "react-pdftotext";

import { FileContext } from "../../App";
import Message from "../Message/Message";

import "./Converter.css";

function Converter() {
  const { file, setFile } = useContext(FileContext);
  const inputRef = useRef();

  const handleFileSelection = (file) => {
    if (file && file.type === "application/pdf") {
      setFile(file);
      extractText(file);
    } else {
      setFile(undefined);
    }
  };

  const extractText = (file) => {
    pdfToText(file)
      .then((text) => console.log(text))
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
        {!file && (
          <div
            className="dropzone"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <img src="src\assets\add-pdf.png" alt="add pdf icon" />
            <h2>Drag & Drop your PDF File</h2>
            <p>or</p>
            <input
              type="file"
              name="file"
              id="file"
              hidden
              onChange={handleOnChange}
              ref={inputRef}
            />
            <button onClick={handleBrowseFile}>
              {file ? "Convert" : "Browse Files"}
            </button>
          </div>
        )}
      </div>
      <Message file={file} />
    </>
  );
}

export default Converter;
