import "./Converter.css";

function Converter() {
  return (
    <>
      <div className="converter">
        <div className="dropzone">
          <img src="src\assets\add-pdf.png" alt="" />
          <h2>Drag & Drop your PDF File</h2>
          <p>or</p>
          <button>Browse File</button>
        </div>
      </div>
    </>
  );
}

export default Converter;
