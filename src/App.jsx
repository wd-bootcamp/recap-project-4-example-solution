import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import useLocalStorageState from "use-local-storage-state";
import { checkColorContrast } from "./lib/utils";
import { initialThemes } from "./lib/themes";
import { useState } from "react";
import ThemeSelector from "./Components/ThemeSelector";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });

  const [currentThemeId, setCurrentThemeId] = useState("t1");
  const currentTheme = themes.find((theme) => theme.id === currentThemeId);

  const themeColors = colors.filter((color) =>
    currentTheme.colorIds.includes(color.id),
  );

  function handleSelectTheme(themeId) {
    setCurrentThemeId(themeId);
  }

  function handleAddTheme() {
    const newTheme = {
      id: crypto.randomUUID(),
      name: "new Theme",
      colorIds: [],
    };

    setThemes([...themes, newTheme]);
    setCurrentThemeId(newTheme.id);
  }

  function handleDeleteTheme(themeId) {
    const themeToDelete = themes.find((theme) => theme.id === themeId);

    // default Theme cannot be deleted
    if (themeToDelete.id === "t1") return;

    // delete theme from theme list
    const updatedThemes = themes.filter((theme) => theme.id !== themeId);
    setThemes(updatedThemes);

    // delete colors associated with theme from colorlist
    const updatedColors = colors.filter(
      (color) => !themeToDelete.colorIds.includes(color.id),
    );
    setColors(updatedColors);

    // set Theme to default theme
    setCurrentThemeId("t1");
  }

  function handleEditTheme(updatedTheme) {
    const updatedThemes = themes.map((theme) =>
      theme.id === updatedTheme.id ? updatedTheme : theme,
    );
    setThemes(updatedThemes);
  }

  async function handleAddColor(data) {
    const id = crypto.randomUUID();
    const contrastScore = await checkColorContrast(data.hex, data.contrastText);

    const newColor = {
      ...data,
      id,
      contrastScore,
    };
    const updatedColors = [newColor, ...colors];
    setColors(updatedColors);

    const updatedThemes = themes.map((theme) =>
      theme.id === currentThemeId
        ? { ...theme, colorIds: [...theme.colorIds, id] }
        : theme,
    );
    setThemes(updatedThemes);
  }

  function handleDeleteColor(id) {
    const updatedColors = colors.filter((color) => color.id !== id);
    setColors(updatedColors);

    const updatedThemes = themes.map((theme) =>
      theme.id === currentThemeId
        ? {
            ...theme,
            colorIds: theme.colorIds.filter((colorId) => colorId !== id),
          }
        : theme,
    );
    setThemes(updatedThemes);
  }

  async function handleEditColor(data) {
    const contrastScore = await checkColorContrast(data.hex, data.contrastText);
    console.log(contrastScore);
    const updatedColor = {
      ...data,
      contrastScore,
    };

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
      <ThemeSelector
        themes={themes}
        currentTheme={currentTheme}
        onSelect={handleSelectTheme}
        onAdd={handleAddTheme}
        onDelete={handleDeleteTheme}
        onEdit={handleEditTheme}
      />
      <ColorForm onSubmit={handleAddColor} />
      {themeColors.map((color) => {
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
