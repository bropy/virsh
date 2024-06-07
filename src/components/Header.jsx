import React, { useState } from 'react';
import '../styles/Header.css';
import logo from '../images/logo.png';


const Header = ({ language, setLanguage, translations }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const languageOptions = {
    en: { flag: require('../images/gb.png'), label: 'EN' },
    ua: { flag: require('../images/ua.png'), label: 'UA' },
    crh: { flag: require('../images/crh.png'), label: 'CRH' },
    pl: { flag: require('../images/pl.png'), label: 'PL' },
    de: { flag: require('../images/de.png'), label: 'DE' },

  };

  return (
    <header>
      <div className="logo-container"> {/* Added container for logo and name */}
        <img src={logo} alt="Logo" className="logo" />
        <h1>Vival Poerty</h1>
      </div>
      <div className="language-dropdown">
        <button className="selected-language" onClick={toggleDropdown}>
          <img
            src={languageOptions[language].flag} 
            alt={`${language} flag`}
            className="flag"
          />
          {languageOptions[language].label}
        </button>

        {isOpen && (
          <div className="dropdown-content">
            {Object.keys(languageOptions).map(lang => (
              <button 
                key={lang}
                onClick={() => { setLanguage(lang); setIsOpen(false); }}
              >
                <img src={languageOptions[lang].flag} alt={`${lang} flag`} className="flag" />
                {languageOptions[lang].label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
