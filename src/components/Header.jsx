import React from 'react';

const Header = ({ language, setLanguage, translations }) => {
  return (
    <header>
      <h2>{translations[language].header.chooseLanguage}</h2>
      <div className="language-buttons">
        <button onClick={() => setLanguage('en')}>EN</button>
        <button onClick={() => setLanguage('ua')}>UA</button>
      </div>
      <h2>{translations[language].style.chooseStyle}</h2>
      <div className="language-buttons">
        <button onClick={() => setLanguage('en')}>EN</button>
        <button onClick={() => setLanguage('ua')}>UA</button>
      </div>
    </header>
  );
};

export default Header;
