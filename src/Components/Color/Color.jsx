import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onDelete, onEdit }) {
  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <CopyAction value={color.hex} />
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <ContrastDisplay score={color.contrastScore} />
      <DeleteAction onDelete={onDelete} />
      <EditAction onEdit={onEdit} color={color} />
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

function EditAction({ onEdit, color }) {
  const [showEditForm, setShowEditForm] = useState(false);

  if (showEditForm) {
    return (
      <div>
        <ColorForm
          onSubmit={(data) => {
            setShowEditForm(false);
            onEdit(data);
          }}
          defaultValues={color}
          submitText="Edit Color"
        />
        <button onClick={() => setShowEditForm(false)}>cancel</button>
      </div>
    );
  }

  return <button onClick={() => setShowEditForm(true)}>edit</button>;
}

function CopyAction({ value }) {
  const [isActive, setIsActive] = useState(false);

  function handleCopyValue() {
    if (isActive) return;

    setIsActive(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => setIsActive(false), 3 * 1000);
  }
  return (
    <button onClick={handleCopyValue}>
      {isActive ? "Successfully copied!" : "copy"}
    </button>
  );
}

function ContrastDisplay({ score }) {
  let displayText = "No Score Found";

  if (score === "AAA") {
    displayText = "⭐︎⭐︎⭐︎";
  }

  if (score === "AA") {
    displayText = "⭐︎⭐︎-";
  }

  if (score === "A") {
    displayText = "⭐︎--";
  }

  if (score === "Fail") {
    displayText = "---";
  }

  return <p>Contrast Score: {displayText}</p>;
}
