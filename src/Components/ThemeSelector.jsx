import { useState } from "react";

export default function ThemeSelector({
  themes,
  currentTheme,
  onSelect,
  onAdd,
  onDelete,
  onEdit,
}) {
  const [isEdit, setIsEdit] = useState(false);

  const isDefaultTheme = currentTheme.id === "t1";
  return (
    <div>
      {isEdit ? (
        <input
          type="text"
          value={currentTheme.name}
          onChange={(event) => {
            onEdit({
              ...currentTheme,
              name: event.target.value,
            });
          }}
        />
      ) : (
        <select onChange={(event) => onSelect(event.target.value)}>
          {themes.map((theme) => (
            <option
              key={theme.id}
              value={theme.id}
              selected={theme.id === currentTheme.id}
            >
              {theme.name}
            </option>
          ))}
        </select>
      )}
      <button onClick={() => setIsEdit(!isEdit)} disabled={isDefaultTheme}>
        {isEdit ? "Save" : "Edit"}
      </button>
      <button
        onClick={() => onDelete(currentTheme.id)}
        disabled={isDefaultTheme}
      >
        delete
      </button>
      <button onClick={onAdd}>Add new Theme</button>
    </div>
  );
}
