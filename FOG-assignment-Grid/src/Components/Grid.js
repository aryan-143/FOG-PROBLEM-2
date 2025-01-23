import React, { useState, useEffect } from "react";

const Grid = () => {
  const gridSize = 21;
  const cells = Array.from({ length: gridSize * gridSize });

  const colors = ["red", "green", "blue"];
  const [waveIndex, setWaveIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveIndex((prev) => {
        let nextIndex = prev + direction;

        if (nextIndex >= gridSize - 2) {
          setDirection(-1);
          setColorIndex((prevColor) => (prevColor + 1) % colors.length);
          return gridSize - 3;
        }
        if (nextIndex < 0) {
          setDirection(1);
          setColorIndex((prevColor) => (prevColor + 1) % colors.length);
          return 0;
        }

        return nextIndex;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundColor: "black" }}
    >
      <div
        className="grid gap-1 p-1"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: "4px",
        }}
      >
        {cells.map((_, index) => {
          const col = index % gridSize;
          const distance = Math.abs(waveIndex - col);

          const isColored = distance <= 1;

          let opacity = 1;
          if (distance === 1) opacity = 0.75;
          if (distance === 2) opacity = 0.50;
          if (distance === 3) opacity = 0.25;
          if (distance === 4) opacity = 0.15;

          return (
            <div
              key={index}
              className="w-5 h-5 border border-black transition-colors duration-300"
              style={{
                backgroundColor: isColored ? colors[colorIndex] : "white",
                opacity: isColored ? opacity : 1,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
