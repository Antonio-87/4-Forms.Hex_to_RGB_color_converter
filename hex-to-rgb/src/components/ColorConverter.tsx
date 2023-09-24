import { ChangeEvent, useState } from "react";

const ColorConverter = () => {
  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState("");
  const [error, setError] = useState("");

  const HandleHexChenge = (event: ChangeEvent<HTMLInputElement>) => {
    const newHex = event.target.value;
    const form = document.querySelector("form") as HTMLFormElement;
    const rgbColor = document.querySelector(".rgb-color") as HTMLFormElement;

    if (newHex.length === 7 && /^#[0-9A-Fa-f]{6}/i.test(newHex)) {
      setHex(newHex);
      setRgb(HexToRgb(newHex));
      form.style.backgroundColor = HexToRgb(newHex);
      rgbColor.style.backgroundColor = HexToRgb(newHex);
      rgbColor.style.filter = "brightness(70%)";
    }
    if (
      (newHex.length === 7 && !/^#[0-9A-Fa-f]{6}/i.test(newHex)) ||
      newHex.length > 7
    ) {
      setHex("HEX");
      setRgb("");
      setError("Ошибка!");
      form.style.backgroundColor = "red";
      rgbColor.style.backgroundColor = "red";
    }

    if (newHex === "") {
      form.style.backgroundColor = "white";
      rgbColor.style.backgroundColor = "white";
      rgbColor.style.filter = "none";
    }
  };

  const HexToRgb = (hex: string) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <form>
      <input
        type="text"
        className="hex-color"
        onChange={HandleHexChenge}
        defaultValue={hex}
        placeholder="Введите цвет в формате HEX"
      ></input>
      <div className={rgb !== "" ? "rgb-color rgb" : "rgb-color error"}></div>
      <span className="text-color">{rgb !== "" ? rgb : error}</span>
    </form>
  );
};

export default ColorConverter;
