import React, { useState, useEffect, useRef } from 'react';
import '../styles/Form.css';

function Form({ selectedStyle, translations, language }) {
  const [text, setText] = useState('');
  const [lines, setLines] = useState([]);
  const verseInputRef = useRef(null);

  useEffect(() => {
    const newLines = text.split('\n').filter(line => line.trim() !== '');
    setLines(newLines); 
  }, [text, selectedStyle]);

  const countVowels = (str) => {
    const vowelsRegex = /[уеїєоаіыэяиюaeiouyæøåäöüìíòóùúâêîôûãõẽĩũ]/gi;
    const matches = str.match(vowelsRegex);
    return matches ? matches.length : 0;
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };


  const handleInputChange = () => {
    setText(verseInputRef.current.innerText);
  };

  return (
    <div className="verse-container">

      <div className="line-numbers-container">
        <div className="line-numbers">
          {lines.map((_, index) => (
            <div
              key={index}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div
        id="verseInput"
        className="verse-input"
        contentEditable
        ref={verseInputRef}
        onInput={handleInputChange}
        onPaste={handlePaste}
      />

    <div className="line-errors">

      </div>

      <div className="vowel-counts"> 
        {lines.map((line, index) => (
          <div 
            key={index} 
          >
            {countVowels(line)} 
          </div>
        ))}
      </div>
    </div>
  );
}

export default Form;
