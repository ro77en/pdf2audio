import { useEffect, useState } from "react";
import "./Message.css";

function Message({ file }) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (file === undefined) {
      setShowMessage(true);

      const messageTimer = setTimeout(() => {
        setShowMessage(false);
      }, 4000);

      return () => {
        clearTimeout(messageTimer);
      };
    }
  }, [file]);

  return (
    <>
      <div className={`msg ${showMessage ? "visible" : ""}`}>
        <p>You can select only 1 PDF file at a time.</p>
      </div>
    </>
  );
}

export default Message;
