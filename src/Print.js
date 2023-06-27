import React, { useEffect } from "react";
import { useReactToPrint } from "react-to-print";
const Print = ({ rows, columns, src, done }) => {
  const componentRef = React.useRef(null);
  const onBeforeGetContentResolve = React.useRef(null);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    removeAfterPrint: true,
    onAfterPrint: done,
  });

  React.useEffect(() => {
    if (typeof onBeforeGetContentResolve.current === "function") {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current]);
  useEffect(() => {
    if (!!src && !!componentRef) handlePrint();
  }, [componentRef, src]);
  if (!src) return null;

  return (
    <div style={{ position: "absolute", top: "1200px" }}>
      <tabel
        ref={componentRef}
        cellspacing="0"
        style={{
          borderSpacing: 0,
          borderCollapse: "collapse",
          width: "793.83px",
          height: "1122.52px",
        }}
      >
        {Array(rows)
          .fill()
          .map(() => Array(columns).fill())
          .map((v) => (
            <tr>
              {v.map(() => (
                <td>
                  <img
                    src={src}
                    style={{ display: "block" }}
                    width="100%"
                    height="100%"
                  />
                </td>
              ))}
            </tr>
          ))}
      </tabel>
    </div>
  );
};

export default Print;
