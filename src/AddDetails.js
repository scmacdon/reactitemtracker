import React, { useState, useEffect } from 'react';
import './styles.css';

const Page1 = () => {
  const [formData, setFormData] = useState({
    title: '',
    engineer: '',
    summary: '',
    service: '',
    type: 'Scout', 
    language: '',
    guide: '',
    url: '',
    sos: false,
    date: '', // New field for date
  });

  const [formErrors, setFormErrors] = useState({
    title: '',
    engineer: '',
    summary: '',
    service: '',
    type: '', 
    sme: '',
    language: '',
    guide: '',
    url: '',
    sos: '',
    date: '', // Added date field to formErrors
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission progress

  useEffect(() => {
    // Function to get today's date and format it as "4/25/2024"
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: formattedDate,
    }));
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue =
      type === 'checkbox' ? checked : type === 'radio' ? JSON.parse(value) : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: '',
    }));
  };

  const validateUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submitting

    const newFormErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      // Check for undefined for string values
      if (typeof value === 'string' && value === '') {
        newFormErrors[key] = 'Please enter a value';
      }
    });

    if (!validateUrl(formData.url)) {
      newFormErrors.url = 'Please enter a valid URL';
    }

    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);
      setIsSubmitting(false); // Submission complete with errors
      return;
    }

    try {
      const response = await fetch('https://zm6c134ibk.execute-api.us-east-1.amazonaws.com/additem/additem', {
     // const response = await fetch('http://localhost:8080/api/items', {   
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      const responseData = await response.text();

      setModalContent(responseData);
      setShowModal(true);
      setIsSubmitting(false); // Submission complete
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setModalContent({ error: error.message });
      setShowModal(true);
      setIsSubmitting(false); // Submission complete with error
    }
  };

  return (
    <div>
      <h1>Getting Started Draft Details</h1>
      <p>Fill in this Form to create your Getting Started details. You can fill in this form for creating a Getting Started Scout only. 
        All Getting Started Scout items must be entered into this system. Do not enter Getting Started Follows in this view.  
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />
          <span className="error-message">{formErrors.title}</span>
        </div>

        <div>
          <label htmlFor="engineer">Engineer:</label>
          <input type="text" id="engineer" name="engineer" value={formData.engineer} onChange={handleInputChange} />
          <span className="error-message">{formErrors.engineer}</span>
        </div>

        <div>
          <label htmlFor="summary">Summary:</label>
          <input type="text" id="summary" name="summary" value={formData.summary} onChange={handleInputChange} />
          <span className="error-message">{formErrors.summary}</span>
        </div>

        <div>
          <label htmlFor="service">AWS Service:</label>
          <input type="text" id="service" name="service" value={formData.service} onChange={handleInputChange} />
          <span className="error-message">{formErrors.service}</span>
        </div>

        <div>
          <label htmlFor="type">Type:</label>
          <select id="type" name="type" value={formData.type} onChange={handleInputChange}>
            <option value="Scout">Scout</option>
          </select>
          <span className="error-message">{formErrors.type}</span>
        </div>

        <div>
          <label htmlFor="sme">Subject Matter Expert:</label>
          <input type="text" id="sme" name="sme" value={formData.sme} onChange={handleInputChange} />
          <span className="error-message">{formErrors.sme}</span>
        </div>

        <div>
          <label htmlFor="language">Programming Language:</label>
          <input type="text" id="language" name="language" value={formData.language} onChange={handleInputChange} />
          <span className="error-message">{formErrors.language}</span>
        </div>

        <div>
          <label htmlFor="guide">Guide Name:</label>
          <input type="text" id="guide" name="guide" value={formData.guide} onChange={handleInputChange} />
          <span className="error-message">{formErrors.guide}</span>
        </div>

        <div>
          <label htmlFor="url">Service URL:</label>
          <input type="text" id="url" name="url" value={formData.url} onChange={handleInputChange} />
          <span className="error-message">{formErrors.url}</span>
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input type="text" id="date" name="date" value={formData.date} readOnly />
          <span className="error-message">{formErrors.date}</span>
        </div>

        <div className="radio-container">
          <p>Is Guide included in SOS</p>
          <label className="radio-label">
            <input
              type="radio"
              name="sos"
              value={true}
              checked={formData.sos === true}
              onChange={handleInputChange}
            />
            Yes
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="sos"
              value={false}
              checked={formData.sos === false}
              onChange={handleInputChange}
            />
            No
          </label>
          <span className="error-message">{formErrors.sos}</span>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* Mask or loading spinner */}
      {isSubmitting && (
        <div className="mask">
          <div className="spinner"></div>
          <p>Submitting...</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            {modalContent && !modalContent.error ? (
              <div>
                <h2>Workflow Submission Successful</h2>
                <p>Your new workflow item is:</p>
                <pre>{JSON.stringify(modalContent, null, 2)}</pre>
              </div>
            ) : (
              <div>
                <h2>Error</h2>
                <p>{modalContent && modalContent.error}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page1;
