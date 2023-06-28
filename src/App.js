import html2canvas from "html2canvas";
import React, { useState } from "react";
import Page from "./Page";
import Print from "./Print";
function App() {
  const [text, setText] = useState("");
  const [canvas, setCanvas] = useState(null);
  const [rand, setRand] = useState(5);
  const [col, setCol] = useState(4);
  const [callBack, setCallBack] = useState({
    call: () => {},
    getInfo: () => {},
  });
  const [textError, setTextError] = useState(false);
  const componentRef = React.useRef(null);
  const extraRef = React.useRef(null);

  return (
    <div className="container">
      <Page
        componentRef={componentRef}
        extraRef={extraRef}
        done={() => {
          setTextError(false);
          setText("");
        }}
        actionCallBack={setCallBack}
      />
      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
        <div className="col d-flex align-items-center">
          <div>
            <br /> <br /> <br /> <br /> <br />
            <div className="row">
              <h1>Adauga</h1>
            </div>
            <div className="row">
              <label htmlFor="text">Scrie mai jos ce vrei sa adaugi:</label>
              <input
                id="text"
                type="text"
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
                style={
                  textError
                    ? {
                        borderWidth: "1px",
                        border: "solid",
                        borderColor: "red",
                      }
                    : {}
                }
              />
              <button
                onClick={() => {
                  setTextError(!text);
                  callBack && callBack.call && callBack.call("text", text);
                }}
              >
                Adauga text
              </button>
            </div>
            <div className="row">
              <button
                onClick={() => {
                  callBack && callBack.call && callBack.call("circle", text);
                }}
              >
                Adauga cerc
              </button>
            </div>
            <br /> <br /> <br /> <br /> <br />
            <div ref={extraRef}>
              <div className="row">
                <h1>Setari element selectat</h1>
              </div>
              <div className="row">
                <button
                  onClick={() => {
                    callBack && callBack.call && callBack.call("sterge", text);
                  }}
                >
                  Sterge Selectat
                </button>
              </div>
              <div className="row">
                <label htmlFor="newText">
                  Editeaza textul elementului selectat
                </label>
                <input
                  id="newText"
                  type="text"
                  value={
                    callBack && callBack.getInfo() && callBack.getInfo().value
                  }
                  onChange={(e) =>
                    callBack &&
                    callBack.call &&
                    callBack.call("setText", e.currentTarget.value)
                  }
                />
              </div>
              <div className="row">
                <label htmlFor="font">Font</label>
                <input
                  id="font"
                  type="number"
                  value={
                    callBack && callBack.getInfo() && callBack.getInfo().font
                  }
                  onChange={(e) =>
                    callBack &&
                    callBack.call &&
                    callBack.call("setFont", Number(e.currentTarget.value))
                  }
                />
              </div>
              <div className="row">
                <label htmlFor="font">Grosime bordura</label>
                <input
                  id="font"
                  type="number"
                  value={
                    callBack && callBack.getInfo() && callBack.getInfo().border
                  }
                  onChange={(e) =>
                    callBack &&
                    callBack.call &&
                    callBack.call("setBorder", Number(e.currentTarget.value))
                  }
                />
              </div>
            </div>
            <br /> <br /> <br /> <br /> <br />
            <div className="row">
              <h1>Setari printare</h1>
            </div>
            <div className="row">
              <label htmlFor="rand">Randuri</label>
              <input
                id="rand"
                type="number"
                value={rand}
                onChange={(e) => setRand(Number(e.currentTarget.value))}
              />
              <label htmlFor="col">Coloane</label>
              <input
                id="col"
                type="number"
                value={col}
                onChange={(e) => setCol(Number(e.currentTarget.value))}
              />
            </div>
            <div className="row">
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
