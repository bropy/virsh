import React, { useState, useEffect, useRef } from 'react';
import '../styles/Form.css';

function Form() {
  const [text, setText] = useState('');
  const [lines, setLines] = useState([]);
  const [selectedLine, setSelectedLine] = useState(null);
  const verseInputRef = useRef(null);

  useEffect(() => {
    setLines(text.split('\n').filter(line => line.trim() !== ''));
  }, [text]);

  useEffect(() => {
    const verseInput = verseInputRef.current;

    const handleInput = () => {
      setText(verseInput.innerText);
    };

    if (verseInput) {
      verseInput.addEventListener('input', handleInput);
    }

    return () => {
      if (verseInput) {
        verseInput.removeEventListener('input', handleInput);
      }
    };
  }, []);

  const handleLineClick = (index) => {
    setSelectedLine(index);
  };

  // Function to count vowels (case-insensitive)
  const countVowels = (str) => {
    const vowelsRegex = /[уеїєоаіыэяиюaeiouyæøåäöüìíòóùúâêîôûãõẽĩũ]/gi;
    const matches = str.match(vowelsRegex);
    return matches ? matches.length : 0;
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain'); // Get plain text
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="verse-container">
      <div className="line-numbers-container">
        <div className="line-numbers">
          {lines.map((_, index) => (
            <div
              key={index}
              onClick={() => handleLineClick(index)}
              className={selectedLine === index ? 'selected-line' : ''}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div
        id="verseInput"
        className="verse-input"
        contentEditable="true"
        ref={verseInputRef}
        onPaste={handlePaste} // Add paste handler
      />

      <div className="vowel-counts">
        {lines.map((line, index) => (
          <div key={index}>{countVowels(line)}</div>
        ))}
      </div>
    </div>
  );
}

export default Form;