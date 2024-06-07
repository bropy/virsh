import React from 'react';
const Select = ({ language, setLanguage, translations }) => {
    return (
      <div>
        <h2>{translations[language].style.chooseStyle}</h2>
        <div className="language-buttons">
          <button onClick={() => setLanguage('en')}>Free verse</button>
          <button onClick={() => setLanguage('ua')}>Sonnet</button>
        </div>
      </div>
    );
  };
  
  export default Select;