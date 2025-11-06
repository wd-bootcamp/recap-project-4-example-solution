import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  function handleAddColor(data) {
    const newColor = {
      ...data,
      id: crypto.randomUUID(),
    };
    const updatedColors = [newColor, ...colors];
    setColors(updatedColors);
  }

  function handleDeleteColor(id) {
    const updatedColors = colors.filter((color) => color.id !== id);
    setColors(updatedColors);
  }

  function handleEditColor(updatedColor) {
    const updatedColors = colors.map((color) => {
      if (color.id !== updatedColor.id) {
        return color;
      }

      return updatedColor;
    });

    setColors(updatedColors);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />
      {colors.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onDelete={() => handleDeleteColor(color.id)}
            onEdit={(data) => {
              const dataWithId = {
                ...data,
                id: color.id,
              };

              handleEditColor(dataWithId);
            }}
          />
        );
      })}
    </>
  );
}

export default App;
