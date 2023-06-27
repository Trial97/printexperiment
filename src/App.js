import html2canvas from "html2canvas";
import React, { useState } from "react";
import Page from "./Page";
import Print from "./Print";
function App() {
  const [text, setText] = useState("");
  const [action, setAction] = useState("");
  const [canvas, setCanvas] = useState(null);
  const [rand, setRand] = useState(5);
  const [col, setCol] = useState(4);
  const componentRef = React.useRef(null);

  return (
    <div class="container">
      <Page
        componentRef={componentRef}
        action={action}
        done={() => {
          setAction("");
          setText("");
        }}
        text={text}
      />
      <div class="row">
        <div class="col"></div>
        <div class="col"></div>
        <div class="col d-flex align-items-center">
          <div>
            <div class="row">
              <label for="text">Scrie mai jos ce vrei sa adaugi:</label>
              <input
                id="text"
                type="text"
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
              />
              <button
                onClick={() => {
                  setAction("text");
                }}
              >
                Adauga text
              </button>
            </div>
            <div class="row">
              <button
                onClick={() => {
                  setAction("circle");
                }}
              >
                Adauga cerc
              </button>
            </div>
            <div class="row">
              <button
                onClick={() => {
                  setAction("sterge");
                }}
              >
                Sterge Selectat
              </button>
            </div>
            <div className="row">
              <label for="rand">Randuri</label>
              <input
                id="rand"
                type="number"
                value={rand}
                onChange={(e) => setRand(Number(e.currentTarget.value))}
              />
              <label for="col">Coloane</label>
              <input
                id="col"
                type="number"
                value={col}
                onChange={(e) => setCol(Number(e.currentTarget.value))}
              />
            </div>
            <div class="row">
              <button
                onClick={() => {
                  html2canvas(componentRef.current).then((canvas) => {
                    setCanvas(canvas.toDataURL("image/png", 1.0));
                  });
                }}
              >
                Printeza
              </button>
            </div>
          </div>
        </div>
      </div>
      <Print
        rows={rand}
        columns={col}
        src={canvas}
        done={() => {
          setCanvas("");
        }}
      />
    </div>
  );
}

export default App;
