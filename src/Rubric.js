import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const PageResearch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [emptyFields, setEmptyFields] = useState([]);
  const [serverResponse, setServerResponse] = useState({
    statusCode: null,
    responseBody: null,
  });

  const fields = [
    'Item Id',
    'Was the service requested for addition to a Decision Guide?',
    'Was the service requested for addition to a Getting Started/Service Guide?',
    'Does the scenario cover 5-10 of the most popular actions (by metrics) of the service?',
    'Does the scenario cover the essential use case of the service?',
  ];

  const fieldMappings = {
    'Item Id': 'itemId',
    'Was the service requested for addition to a Decision Guide?': 'decisionGuide',
    'Was the service requested for addition to a Getting Started/Service Guide?': 'gettingStarted',
    'Does the scenario cover 5-10 of the most popular actions (by metrics) of the service?': 'popularActions',
    'Does the scenario cover the essential use case of the service?': 'essentialUseCase',
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [fieldMappings[name]]: value });
  };

  const openModal = () => {
    // Check for empty fields before opening the modal
    const emptyFieldsList = fields.filter((field) => !formData[fieldMappings[field]]);
    setEmptyFields(emptyFieldsList);

    if (emptyFieldsList.length === 0 && formData.itemId) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({});
    setEmptyFields([]);
  };

  const renderFormFields = () => {
    return fields.map((field) => (
      <div key={field} style={{ marginBottom: '10px' }}>
        <label>{field}:</label>
        {field === 'Item Id' ? (
          <input
            type="text"
            name={field}
            value={formData[fieldMappings[field]] || ''}
            onChange={handleFieldChange}
          />
        ) : (
          <select
            name={field}
            value={formData[fieldMappings[field]] || 'No'}
            onChange={handleFieldChange}
            style={{ marginLeft: '10px' }}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        )}
      </div>
    ));
  };

  const handleSave = async () => {
    try {
      // Check if Item Id is empty
      if (!formData.itemId) {
        alert("Please fill out the 'Item Id' field.");
        return;
      }
  
      // Display a confirmation dialog
      const shouldSubmit = window.confirm('Are you sure you want to submit the Rubric data?');
  
      if (!shouldSubmit) {
        // If the user clicks "Cancel," do not submit data
        return;
      }
  
      // Create a copy of formData with all fields filled with 'No' as default
      const formDataCopy = { ...formData };
      fields.forEach(field => {
        if (!(fieldMappings[field] in formDataCopy)) {
          formDataCopy[fieldMappings[field]] = 'No';
        }
      });
  
     // const response = await fetch('http://localhost:8080/api/items/rubric',{
      const response = await fetch('https://tat7tu91yf.execute-api.us-east-1.amazonaws.com/Rubric',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataCopy),
      });
  
      setServerResponse({
        statusCode: response.status,
        responseBody: await response.text(),
      });
  
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Handle any unexpected errors
    }
  };
  

  return (
    <div>
      <h1>Getting Started Rubric Information</h1>
      <p>
        An SDK getting started scenario uses a single AWS service (or part of a service) to show new AWS developers how to get up and running using the SDK and the service.

        The rubric can be applied to any candidate AWS Service that meets the following go/no-go criteria:
      </p>
      <ul>
        <li>The service does not have an existing getting-started-style scenario in the Code Library.</li>
        <li>The service is included in the list of Onboard Candidates.</li>
        <li>The service is in the top 50 services based on data metrics or in the original MVP candidate list. (OR is a new service?)</li>
      </ul>

      <div>{renderFormFields()}</div>
      <button onClick={handleSave}>Submit</button>

      {emptyFields.length > 0 && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          Please fill out all fields: {emptyFields.concat(!formData.itemId ? 'Item Id' : []).join(', ')}
        </p>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel={`Submit Confirmation`}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              width: '60%',
              margin: 'auto',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <button onClick={closeModal} style={{ float: 'right', margin: '10px', padding: '5px' }}>
            Close
          </button>
          <div style={{ padding: '20px' }}>
            <h2>Server Response</h2>
            <div style={{ marginBottom: '10px' }}>
              <strong>Status Code:</strong> {serverResponse.statusCode}
            </div>
            <div>
              <strong>Response Body:</strong> {serverResponse.responseBody}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PageResearch;
