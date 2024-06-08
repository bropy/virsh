import React from 'react';
import '../styles/Footer.css';

function Footer({ language, translations }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <div className="contact-info">
          <a href="mailto:bohdan.ceo.dev@gmail.com">bohdan.ceo.dev@gmail.com</a>
        </div>
        <div className="copyright">
          &copy; {currentYear} {translations[language].footer.copyright}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
