import React from 'react';
import '../styles/Footer.css'; // Create a separate Footer.css file

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <div className="contact-info">
          <a href="mailto:your-email@example.com">your-email@example.com</a>
        </div>
        <div className="copyright">
          &copy; {currentYear} Your Name
        </div>
      </div>
    </footer>
  );
}

export default Footer;
