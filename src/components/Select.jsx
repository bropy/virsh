import React, { useState, useMemo } from 'react';
import '../styles/Select.css';

const Select = ({ language, translations,onStyleSelect  }) => {
  const pastelColors = useMemo(() => ['#E6A7FF', '#A7E6C7', '#FFE6A7', '#FFA7A7', '#A7CCE6'], []);
  const [colorIndex, setColorIndex] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(0);

  const handleButtonClick = (index) => {
    setColorIndex((prevIndex) => (prevIndex + 1) % pastelColors.length);
    setSelectedStyle(index);
    onStyleSelect(verseStyles[index]); // Call the callback to update the parent
  };

  const getButtonColor = (index) => {
    return pastelColors[(index + colorIndex) % pastelColors.length];
  };

  const verseStyles = translations[language]?.style?.verseStyles || [];
  const verseStyleDetails = useMemo(() => {
    const details = {};
    (translations[language]?.style?.verseStyles || []).forEach((style, index) => {
      details[style] = translations[language]?.style?.verseStyleDetails?.[index] || {};
    });
    return details;
  }, [language, translations]);
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
      {selectedStyle !== null && (
  <div className="selected-style-info">
    <h3 className="style-name">{verseStyles[selectedStyle]}</h3>
    <p className="style-description">
      {verseStyleDetails[verseStyles[selectedStyle]]?.description}
    </p>
    <ul className="style-details">
      <li>
        <strong>{translations[language].style.lines}:</strong>{" "}
        {verseStyleDetails[verseStyles[selectedStyle]]?.lines || "N/A"}
      </li>
      {verseStyleDetails[verseStyles[selectedStyle]]?.syllables && (
        <li>
          <strong>{translations[language].style.syllablesPerLine}:</strong>{" "}
          {verseStyleDetails[verseStyles[selectedStyle]]?.syllables}
        </li>
      )}
      {verseStyleDetails[verseStyles[selectedStyle]]?.additionalInfo && (
        <li>
          <strong>{translations[language].style.additionalInfo}:</strong>{" "}
          {verseStyleDetails[verseStyles[selectedStyle]]?.additionalInfo}
        </li>
      )}
    </ul>
  </div>
)}


    </div>
  );
};

export default Select;
