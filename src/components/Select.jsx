import React, { useState, useMemo } from 'react';
import '../styles/Select.css';

const Select = ({ language, translations }) => {
  const pastelColors = useMemo(() => ['#E6A7FF', '#A7E6C7', '#FFE6A7', '#FFA7A7', '#A7CCE6'], []);
  const [colorIndex, setColorIndex] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(0);

  const handleButtonClick = (index) => {
    setColorIndex((prevIndex) => (prevIndex + 1) % pastelColors.length);
    setSelectedStyle(index);
  };

  const getButtonColor = (index) => {
    return pastelColors[(index + colorIndex) % pastelColors.length];
  };

  const verseStyles = translations[language]?.style?.verseStyles || [];

  return (
    <div>
      <h2 id="style-chooser">{translations[language]?.style?.chooseStyle || "Choose Style"}</h2>
      <div
        className="style-buttons"
        role="radiogroup"
        aria-labelledby="style-chooser"
      >
        {verseStyles.map((style, index) => (
          <button
            key={index}
            className={selectedStyle === index ? 'selected' : ''}
            style={{ backgroundColor: getButtonColor(index) }}
            onClick={() => handleButtonClick(index)}
            role="radio"
            aria-checked={selectedStyle === index}
            tabIndex={selectedStyle === index ? 0 : -1}
          >
            {style}
          </button>
        ))}
      </div>
      <p className="selected-style">
        {verseStyles[selectedStyle] || "No style selected"}
      </p>
    </div>
  );
};

export default Select;
