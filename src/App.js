import React, { useState, useEffect } from 'react';
import enTranslations from './locales/en/global.json';
import uaTranslations from './locales/ua/global.json';

function App() {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: enTranslations,
    ua: uaTranslations,
  };

  useEffect(() => {
    document.title = translations[language].mainSection.title;
    window.history.replaceState(null, '', `/${language}`);
  }, [language, translations]);

  return (
    <div>
      <header>
        <h2>{translations[language].header.chooseLanguage}</h2>
        <div className="language-buttons">
          <button onClick={() => setLanguage('en')}>English</button>
          <button onClick={() => setLanguage('ua')}>Українська</button>
        </div>
      </header>
      <main>
        <h1>{translations[language].mainSection.title}</h1>
        {/* ...other content */}
      </main>
    </div>
  );
}

export default App;
