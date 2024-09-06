import { useEffect, useState } from "react";
import "./Message.css";

function Message(props) {

  useEffect(() => {
    if (props.showMessage) {
        const hideTimer = setTimeout(() => {
          props.hideMessage();
        }, 4000);
    
        return () => {
          clearTimeout(hideTimer);
        };
    }

  }, [props.showMessage]);

  return (
    <>
        <div className={`msg ${props.showMessage ? 'visible' : ''}`}>
          <p>You can select only 1 PDF file at a time.</p>
        </div>
    </>
  );
}

export default Message;
