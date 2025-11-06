export async function checkColorContrast(colorA, colorB) {
  if (colorA === colorB) {
    return "Fail"; //worst contrast possible
  }

  try {
    const response = await fetch(
      "https://www.aremycolorsaccessible.com/api/are-they",
      {
        method: "POST",
        body: JSON.stringify({ colors: [colorA, colorB] }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    return data.small;
  } catch (error) {
    console.error(error);

    return "Error";
  }
}
