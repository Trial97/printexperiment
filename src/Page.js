import { useEffect, useState } from "react";
import Component from "./Component";

export const useOnOutsideClickWithRefsOr = (f, refs) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refs.every(
          (ref) => ref && ref.current && !ref.current.contains(event.target)
        )
      )
        f();
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs]);
};
const Page = ({ done, componentRef, actionCallBack, extraRef }) => {
  const [components, setComponents] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const getInfo = () => components.find((i) => i.id === selectedID);
  const update = (action, text) => {
    if (action) {
      switch (action) {
        case "text":
          if (!text) {
            setSelectedID(0);
            return;
          }
        case "circle":
          setSelectedID(0);
          setComponents((v) => [
            ...v,
            {
              id: (v || []).reduce((a, b) => Math.max(a, b.id), 0) + 1,
              type: action,
              value: text,
              font: 10,
              border: 10,
            },
          ]);
          break;
        case "sterge":
          setComponents((v) => v.filter((i) => i.id !== selectedID));
          setSelectedID(0);
          break;
        case "setFont":
          setComponents(
            (v) => {
              const sel = v.find((i) => i.id === selectedID);
              if (!sel) return v;
              return [
                ...v.filter((i) => i.id !== selectedID),
                {
                  ...sel,
                  font: text,
                },
              ];
            },
            actionCallBack({
              call: update,
              getInfo: getInfo,
            })
          );
          break;
        case "setBorder":
          setComponents(
            (v) => {
              const sel = v.find((i) => i.id === selectedID);
              if (!sel) return v;
              return [
                ...v.filter((i) => i.id !== selectedID),
                {
                  ...sel,
                  border: text,
                },
              ];
            },
            actionCallBack({
              call: update,
              getInfo: getInfo,
            })
          );
          break;
        case "setText":
          setComponents(
            (v) => {
              const sel = v.find((i) => i.id === selectedID);
              if (!sel) return v;
              return [
                ...v.filter((i) => i.id !== selectedID),
                {
                  ...sel,
                  value: text,
                },
              ];
            },
            actionCallBack({
              call: update,
              getInfo: getInfo,
            })
          );
          break;
      }
      done();
    }
  };
  useEffect(() => {
    actionCallBack({
      call: update,
      getInfo: getInfo,
    });
  }, [selectedID, components]);
  useOnOutsideClickWithRefsOr(() => {
    setSelectedID(0);
  }, [componentRef, extraRef]);
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
            font={v.font}
            border={v.border}
          />
        ))}
      </div>
    </div>
  );
};
export default Page;
