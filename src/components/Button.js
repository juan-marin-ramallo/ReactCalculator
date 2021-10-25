export const Button = (props) => {
  //Logica del Button
  return (
    <>
      <button className="number" onClick={() => props.onClick(props.caption)}>
        {props.caption}
      </button>
    </>
  );
};
