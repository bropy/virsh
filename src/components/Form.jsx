import React, { useState, useEffect, useRef } from 'react';
import '../styles/Form.css';
import poemConstraints from '../data/poems.json';

function Form({ selectedStyle, translations, language }) {
  const [text, setText] = useState('');
  const [lines, setLines] = useState([]);
  const [errors, setErrors] = useState([]);
  const verseInputRef = useRef(null);

  useEffect(() => {
    const newLines = text.split('\n').filter(line => line.trim() !== '');
    setLines(newLines);
    validateLines(newLines, poemConstraints[selectedStyle]); // Pass constraints
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

  const validateLines = (lines, constraints) => {
    if (!constraints) return; // Handle no style selected

    const newErrors = [];

    lines.forEach((line, index) => {
      let errorMessage = '';

      if (constraints.rowCount !== null && lines.length > constraints.rowCount) {
        errorMessage = `Too many lines. Expected: ${constraints.rowCount}`;
      } else if (
        constraints.vowelConstraints.length > 0 &&
        countVowels(line) !== constraints.vowelConstraints[index]
      ) {
        errorMessage = `Line ${index + 1} should have ${constraints.vowelConstraints[index]} vowels. Found: ${countVowels(line)}`;
      }

      newErrors[index] = errorMessage;
    });

    setErrors(newErrors);
  };

  const isLineValid = (line, index, constraints) => {
    if (!constraints) return true;

    if (constraints.rowCount !== null && lines.length > constraints.rowCount) {
      return false;
    }

    if (constraints.vowelConstraints.length > 0 && index < constraints.vowelConstraints.length) {
      return countVowels(line) === constraints.vowelConstraints[index];
    }

    return true;
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
              className={`line-number ${isLineValid(lines[index], index, poemConstraints[selectedStyle]) ? 'valid-line' : 'invalid-line'}`}
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
        {errors.map((error, index) => (
          error ? <div key={index} className="line-error">{error}</div> : null
        ))}
      </div>

      <div className="vowel-counts"> 
        {lines.map((line, index) => (
          <div 
            key={index} 
            style={{ color: isLineValid(line, index, poemConstraints[selectedStyle]) ? 'green' : 'red' }}
          >
            {countVowels(line)} 
          </div>
        ))}
      </div>
    </div>
  );
}

export default Form;
