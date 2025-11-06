import { useState } from "react";
import "./ColorForm.css";

// Written in Capital Letters to indicate a never changing value
const INITIAL_VALUES = {
  role: "",
  hex: "#000000",
  contrastText: "#ffffff",
};

export default function ColorForm({
  onSubmit,
  submitText = "Add Color",
  defaultValues = INITIAL_VALUES,
}) {
  const [hex, setHex] = useState(defaultValues.hex);
  const [contrast, setContrast] = useState(defaultValues.contrastText);

  function resetColors() {
    setHex(defaultValues.hex);
    setContrast(defaultValues.contrastText);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit(data);

    event.target.reset();
    resetColors();
  }
  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label className="color-input">
        Role
        <input
          type="text"
          name="role"
          required
          defaultValue={defaultValues.role}
        />
      </label>
      <label className="color-input">
        Hex
        <input
          type="text"
          name="hex"
          required
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
          required
          value={contrast}
          onChange={(event) => setContrast(event.target.value)}
        />
        <input
          type="color"
          value={contrast}
          onChange={(event) => setContrast(event.target.value)}
        />
      </label>
      <button>{submitText}</button>
    </form>
  );
}
