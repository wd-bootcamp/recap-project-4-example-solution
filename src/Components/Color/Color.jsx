import { useState } from "react";
import "./Color.css";

export default function Color({ color, onDelete }) {
  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <DeleteAction onDelete={onDelete} />
    </div>
  );
}

function DeleteAction({ onDelete }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (showConfirmation) {
    return (
      <div>
        <p>Are you sure?</p>
        <button onClick={() => setShowConfirmation(false)}>cancel</button>
        <button onClick={onDelete}>continue</button>
      </div>
    );
  }

  return <button onClick={() => setShowConfirmation(true)}>delete</button>;
}
