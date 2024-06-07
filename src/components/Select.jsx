import React, { useEffect, useRef, useMemo, useState } from 'react';
import '../styles/Select.css';

const Select = ({ language, setLanguage, translations }) => {
  const pastelColors = useMemo(() => ['#E6A7FF', '#A7E6C7', '#FFE6A7', '#FFA7A7', '#A7CCE6'], []);
  const currentColorIndex = useRef(0);
  const [selectedStyle, setSelectedStyle] = useState(0);

  useEffect(() => {
    const buttons = document.querySelectorAll('.style-buttons button');

    buttons.forEach((button, index) => {
      button.style.backgroundColor = pastelColors[index % pastelColors.length];

      button.addEventListener('click', () => {
        currentColorIndex.current = (currentColorIndex.current + 1) % pastelColors.length;
        buttons.forEach((btn, idx) => {
          btn.style.backgroundColor = pastelColors[(idx + currentColorIndex.current) % pastelColors.length];
        });

        setLanguage(button.textContent.toLowerCase());
        setSelectedStyle(index);
      });
    });

    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', null);
      });
    };
  }, [setLanguage, pastelColors]);

  return (
    <div>
      <h2>{translations[language].style.chooseStyle}</h2>
      <div className="style-buttons">
        {translations[language].style.verseStyles.map((style, index) => (
          <button key={index} className={selectedStyle === index ? 'selected' : ''}>
            {style}
          </button>
        ))}
      </div>
      <p className="selected-style">
      {translations ? <Select language={language} setLanguage={setLanguage} translations={translations} /> : <p>Loading...</p>}
      </p>
    </div>
  );
};

export default Select;