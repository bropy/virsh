import React, { useEffect, useState } from 'react';
import enTranslations from './locales/en/global.json';
import uaTranslations from './locales/ua/global.json';
import crhTranslations from './locales/crh/global.json';
import plTranslations from './locales/pl/global.json';
import deTranslations from './locales/de/global.json';
import Header from './components/Header'; 
import Form from './components/Form';
import Select from './components/Select';
import Footer from './components/Footer'; 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import "./App.css";

const translations = {
  en: enTranslations,
  ua: uaTranslations,
  crh: crhTranslations,
  pl: plTranslations,
  de: deTranslations,
};
const firebaseConfig = {
  apiKey: "AIzaSyCK8hbj1S3AQixvnxKIcDVFQB-ES4Y4p6Y",
  authDomain: "poetryapp-1242c.firebaseapp.com",
  projectId: "poetryapp-1242c",
  storageBucket: "poetryapp-1242c.appspot.com",
  messagingSenderId: "278664736516",
  appId: "1:278664736516:web:316bb8b1957c390f3caa51",
  measurementId: "G-57MQLMFLVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
function App() {
  const [language, setLanguage] = useState('en');
  const [selectedStyle, setSelectedStyle] = useState(0);

  useEffect(() => {
    document.title = translations[language]?.mainSection?.title || "Lyric Size Online";
    window.history.replaceState(null, '', `/${language}`);
  }, [language]); 
  const handleStyleSelect = (style) => {
    const styleIndex = translations[language].style.verseStyles.indexOf(style);
    setSelectedStyle(styleIndex);
  };
  if (!translations[language]) {
    return <div>Loading translations...</div>;
  }

  return (
    <div>
      <Header language={language} setLanguage={setLanguage} translations={translations} />
      <Select
        language={language}
        translations={translations}
        onStyleSelect={handleStyleSelect} 
      />
      <h1 className='main-header'>{translations[language].mainSection.title}</h1>
      <Form
        selectedStyle={selectedStyle}
        translations={translations}
        language={language}
      />
      <Footer
        translations={translations}
        language={language}
      />
    </div>
  );
}

export default App;