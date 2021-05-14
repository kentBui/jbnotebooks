import React, { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
    <html>
      <head>
        <style>html { background-color: white;} </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (error) => {
            const root = document.querySelector("#root");
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error: </h4>' + error + '</div>';
          }
          window,addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error.message);
          })
          window.addEventListener('message', (event) => {
            try{
              eval(event.data)
            } catch (error) {
              handleError(error);
            }
          }, false)
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcDoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <div className="iframe-wrapper">
      <iframe
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts allow-modals allow-popups allow-forms"
        title="test"
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
