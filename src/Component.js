import { Rnd } from "react-rnd";

const Component = ({
  id,
  isCircle,
  text,
  selectedID,
  setSelectedID,
  font,
  border,
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
        borderWidth: isCircle || selectedID === id ? border + "px" : "",
        border: isCircle || selectedID === id ? "solid" : "",
        borderColor: selectedID === id ? "red" : isCircle ? "black" : "",
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
      <div style={{ margin: "auto", zIndex: 10, fontSize: font + "px" }}>
        {text}
      </div>
    </Rnd>
  );
};
export default Component;
