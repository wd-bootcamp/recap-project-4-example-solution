import { useState } from "react";
import "./ColorForm.css";

// Written in Capital Letters to indicate a never changing value
const INITIAL_VALUES = {
  role: "",
  hex: "#000000",
  contrastText: "#ffffff",
};

export default function ColorForm({ onAddColor }) {
  const [hex, setHex] = useState(INITIAL_VALUES.hex);
  const [contrast, setContrast] = useState(INITIAL_VALUES.contrastText);

  function resetColors() {
    setHex(INITIAL_VALUES.hex);
    setContrast(INITIAL_VALUES.contrastText);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onAddColor(data);

    event.target.reset();
    resetColors();
  }
  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label className="color-input">
        Role
        <input type="text" name="role" defaultValue={INITIAL_VALUES.role} />
      </label>
      <label className="color-input">
        Hex
        <input
          type="text"
          name="hex"
          value={hex}
          onChange={(event) => setHex(event.target.value)}
        />
        <input
          type="color"
          value={hex}
          onChange={(event) => setHex(event.target.value)}
        />
      </label>
      <label className="color-input">
        Contrast Text
        <input
          type="text"
          name="contrastText"
          value={contrast}
          onChange={(event) => setContrast(event.target.value)}
        />
        <input
          type="color"
          value={contrast}
          onChange={(event) => setContrast(event.target.value)}
        />
      </label>
      <button>Add Color</button>
    </form>
  );
}
