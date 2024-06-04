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

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  // Function to count vowels in a string (case-insensitive)
  const countVowels = (str) => {
    const vowelsRegex = /[aeiouyæøåäöüìíòóùúâêîôûãõẽĩũ]/gi; // Expanded for common vowels
    const matches = str.match(vowelsRegex);
    return matches ? matches.length : 0;
  };

  return (
    <div className="verse-container">
      <div className="line-numbers">
        {lines.map((line, index) => (
          <div
            key={index}
            onClick={() => setSelectedLine(index)}
            className={selectedLine === index ? 'selected-line' : ''}
          >
            {index + 1}
            <span className="vowel-count">
              {countVowels(line)}
            </span>
          </div>
        ))}
      </div>
      <textarea
        ref={verseInputRef}
        value={text}
        onChange={handleInputChange}
        className="verse-input"
      />
    </div>
  );
}

export default Form;
