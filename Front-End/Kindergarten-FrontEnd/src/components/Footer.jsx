import React, { useState } from "react";
import "./styles/footer.css";
import Modal from "./Modal"; // Import your modal

// Simple SVG icons for social media
const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="social-icon-svg" // Apply class for hover effect
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.016 3.657 9.18 8.438 9.879V14.81h-2.923v-2.846h2.923V9.742c0-2.899 1.77-4.473 4.342-4.473 1.243 0 2.316.093 2.628.134v2.792h-1.65c-1.306 0-1.56.62-1.56 1.53v1.99h3.118l-.506 2.846h-2.612v6.07c4.781-.699 8.438-4.863 8.438-9.879C22 6.477 17.523 2 12 2z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="social-icon-svg" // Apply class for hover effect
  >
    <path d="M22.46 6c-.77.34-1.6.57-2.46.66.89-.53 1.57-1.37 1.89-2.37-.83.49-1.75.84-2.72 1.03C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.5 7.6 3.68 5.25c-.36.62-.56 1.35-.56 2.12 0 1.48.75 2.79 1.89 3.56-.7-.02-1.37-.21-1.95-.5v.05c0 2.07 1.47 3.8 3.42 4.19-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.54 1.7 2.11 2.93 3.97 2.97C14.01 19.34 11.85 20 9.5 20c-.76 0-1.5-.05-2.24-.13 2.98 1.9 6.54 3.02 10.35 3.02C20.88 23.99 24 19.49 24 14.61c0-.47-.01-.93-.03-1.39.81-.58 1.5-1.3 2.05-2.12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="social-icon-svg" // Apply class for hover effect
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.899.422.422.682.82.899 1.382.166.422.36 1.057.415 2.227.059 1.266.071 1.646.071 4.85s-.012 3.584-.071 4.85c-.055 1.17-.249 1.805-.415 2.227-.217.562-.477.96-.899 1.382-.422.422-.82.682-1.382.899-.422.166-1.057.36-2.227.415-1.266.059-1.646.071-4.85.071s-3.584-.012-4.85-.071c-1.17-.055-1.805-.249-2.227-.415-.562-.217-.96-.477-1.382-.899-.422-.422-.682-.82-.899-1.382-.166-.422-.36-1.057-.415-2.227-.059-1.266-.071-1.646-.071-4.85s.012-3.584.071-4.85c.055-1.17.249-1.805.415-2.227.217-.562.477-.96.899-1.382.422-.422.82-.682 1.382-.899.422-.166 1.057-.36 2.227-.415C8.416 2.175 8.796 2.163 12 2.163zm0 1.442a8.442 8.442 0 1 0 0 16.884 8.442 8.442 0 0 0 0-16.884zm0 2.92c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zm0 1.442a3.058 3.058 0 1 1 0 6.116 3.058 3.058 0 0 1 0-6.116zm6.552-4.908a1.018 1.018 0 1 0 0 2.036 1.018 1.018 0 0 0 0-2.036z" />
  </svg>
);

const Footer = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Navigation Links */}
        <div className="footer-links">
          <a
            href="#"
            className="footer-link"
            onClick={(e) => {
              e.preventDefault();
              setShowContactModal(true);
            }}
          >
            Contact Us
          </a>
          <a
            href="#"
            className="footer-link"
            onClick={(e) => {
              e.preventDefault();
              setShowPrivacyModal(true);
            }}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="footer-link"
            onClick={(e) => {
              e.preventDefault();
              setShowTermsModal(true);
            }}
          >
            Terms of Service
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="social-icons">
          <a
            href="https://www.facebook.com/"
            aria-label="Facebook"
            target="_blank"
          >
            <FacebookIcon />
          </a>
          <a href="https://x.com/" aria-label="Twitter" target="_blank">
            <TwitterIcon />
          </a>
          <a
            href="https://www.instagram.com/"
            aria-label="Instagram"
            target="_blank"
          >
            <InstagramIcon />
          </a>
        </div>

        {/* Copyright */}
        <div className="copyright">
          &copy; 2025 Kindergarten Management System. All rights reserved.
        </div>
      </div>

      {/* Contact Us Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Contact Us"
      >
        <p>
          Sunshine Kindergarten is dedicated to providing a safe, nurturing, and
          creative environment for children ages 3-6. Our experienced staff is
          always happy to answer your questions and help you with enrollment,
          curriculum, or any concerns you may have.
        </p>
        <p>
          <strong>Address:</strong> 123 Rainbow Lane, Happyville, Country
          <br />
          <strong>Email:</strong>{" "}
          <a href="mailto:info@kindergarten.com">info@kindergarten.com</a>
          <br />
          <strong>Phone:</strong> <a href="tel:+1234567890">+1 234 567 890</a>
        </p>
        <p>
          We welcome visits during school hours (Mon-Fri, 8:00 AM - 4:00 PM).
          For more information about our programs, events, or to schedule a
          tour, please reach out via email or phone. We look forward to hearing
          from you!
        </p>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        title="Privacy Policy"
      >
        <p>
          At Sunshine Kindergarten, your privacy is our priority. We collect
          only the information necessary to provide a safe and effective
          learning environment for your child. All personal data is stored
          securely and is never shared with third parties without your explicit
          consent.
        </p>
        <p>
          We use your contact information to communicate important updates,
          events, and emergency notifications. You may opt out of non-essential
          communications at any time by contacting our office.
        </p>
        <p>
          Our website uses cookies to enhance your browsing experience. By using
          our site, you agree to our privacy practices. For questions or
          concerns about your data, please contact us at{" "}
          <a href="mailto:privacy@kindergarten.com">privacy@kindergarten.com</a>
          .
        </p>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms of Service"
      >
        <p>
          By accessing and using the Sunshine Kindergarten website, you agree to
          comply with our terms and conditions. All content, including images
          and text, is for informational purposes only and may not be reproduced
          without permission.
        </p>
        <p>
          Enrollment in our programs is subject to availability and compliance
          with our admission policies. Parents and guardians are responsible for
          providing accurate information and updating us with any changes
          regarding their child’s health or contact details.
        </p>
        <p>
          We reserve the right to update these terms at any time. Continued use
          of our website and services constitutes acceptance of any changes. For
          questions about our terms, please contact us at{" "}
          <a href="mailto:info@kindergarten.com">info@kindergarten.com</a>.
        </p>
      </Modal>
    </footer>
  );
};

export default Footer;
