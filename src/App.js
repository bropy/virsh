import React, { useState, useEffect } from 'react';
import enTranslations from './locales/en/global.json';
import uaTranslations from './locales/ua/global.json';
import Header from './components/Header'; 

const translations = {  // Move translations outside of the component
  en: enTranslations,
  ua: uaTranslations,
};

function App() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    document.title = translations[language].mainSection.title;
    window.history.replaceState(null, '', `/${language}`);
  }, [language]); 

  return (
    <div>
      <Header language={language} setLanguage={setLanguage} translations={translations} />
      <main>
        <h1>{translations[language].mainSection.title}</h1>
      </main>
    </div>
  );
}

export default App;
