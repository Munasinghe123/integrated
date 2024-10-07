import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactAdmin.css';

function ContactAdmin() {
  const form = useRef();
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    // Check for validation errors before sending
    if (nameError || emailError) {
      return;
    }

    emailjs
      .sendForm('service_cb99dmt', 'template_hae3dh8', form.current, {
        publicKey: 'SYjeI94bKxx6e628N',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset(); // Reset form after successful submission
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    // Validate that only letters and spaces are entered
    if (/^[a-zA-Z ]*$/.test(value) || value === '') {
      setNameError(''); // Clear error if valid
    } else {
      setNameError('Please enter letters only');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    // Basic email format validation
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError(''); // Clear error if valid
    } else {
      setEmailError('Please enter a valid email address');
    }
  };

  return (
    <div className="contact-form-container">
      <h1>Contact Admin Page</h1>

      <div className="contact-form">
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input
            type="text"
            name="user_name"
            required
            onChange={handleNameChange}
          />
          {nameError && <p style={{ color: 'red' }}>{nameError}</p>} {/* Show name error */}
          <br /><br />

          <label>Email</label>
          <input
            type="email"
            name="user_email"
            required
            onChange={handleEmailChange}
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>} {/* Show email error */}
          <br /><br />

          <label>Message</label>
          <textarea name="message" required /><br /><br />

          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactAdmin;
