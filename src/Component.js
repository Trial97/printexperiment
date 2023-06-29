import { Rnd } from "react-rnd";

const Component = ({
  id,
  isCircle,
  text,
  selectedID,
  setSelectedID,
  font,
  border,
  bold,
  italic,
}) => {
  return (
    <Rnd
      id={id}
      style={{
        display: "flex",
        width: "100px",
        height: "100px",
        // backgroundColor: isCircle && "green",
        borderRadius: isCircle && "50%",
        borderWidth: selectedID === id && border < 10 ? "10px" : border + "px",
        border: "solid",
        borderColor: selectedID === id ? "red" : "black",
      }}
      dragGrid={[50, 50]}
      enableResizing={true}
      lockAspectRatio={isCircle}
      bounds={"parent"}
      default={{
        x: 0,
        y: 0,
        width: 200,
        height: 200,
      }}
      onMouseDown={() => {
        setSelectedID(id);
      }}
    >
      <div
        style={{
          margin: "auto",
          zIndex: 10,
          fontSize: font + "px",
          fontWeight: bold ? "bold" : "normal",
          fontStyle: italic ? "italic" : "normal",
        }}
      >
        {text}
      </div>
    </Rnd>
  );
};
export default Component;
