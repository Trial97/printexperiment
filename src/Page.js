import { useEffect, useState } from "react";
import Component from "./Component";

const Page = ({ action, done, text, componentRef }) => {
  const [components, setComponents] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  useEffect(() => {
    if (action) {
      if (action === "text" && text === "") {
        setSelectedID(0);
        return;
      }
      done();
      if (action === "sterge") {
        setComponents((v) => v.filter((i) => i.id !== selectedID));
        setSelectedID(0);
        return;
      }
      setSelectedID(0);
      setComponents((v) => [
        ...v,
        {
          id: (v || []).reduce((a, b) => Math.max(a, b.id), 0) + 1,
          type: action,
          value: text,
        },
      ]);
    }
  }, [action, text]);

  return (
    <div style={{ top: "100px", position: "absolute" }}>
      <div
        ref={componentRef}
        style={{
          width: "793.83px",
          height: "1122.52px",
          borderStyle: "solid",
          position: "absolute",
        }}
        id="page"
      >
        {components.map((v) => (
          <Component
            key={"ckey" + v.id}
            id={v.id}
            text={v.value}
            isCircle={v.type == "circle"}
            selectedID={selectedID}
            setSelectedID={setSelectedID}
          />
        ))}
      </div>
    </div>
  );
};
export default Page;
