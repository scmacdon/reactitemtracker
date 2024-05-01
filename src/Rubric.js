import React, { useState } from 'react';

const PageResearch = () => {
  const [formData, setFormData] = useState({});
  const [emptyFields, setEmptyFields] = useState([]);
  const [serverResponse, setServerResponse] = useState({
    statusCode: null,
    responseBody: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
      if (!formData.itemId) {
        alert("Please fill out the 'Item Id' field.");
        return;
      }
  
      const formDataCopy = { ...formData };
      fields.forEach(field => {
        if (!(fieldMappings[field] in formDataCopy)) {
          formDataCopy[fieldMappings[field]] = 'No';
        }
      });
  
      const response = await fetch('https://tat7tu91yf.execute-api.us-east-1.amazonaws.com/Rubric', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataCopy),
      });
  
      const responseBody = await response.text();
      alert(responseBody);
  
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };
  



  return (
    <div>
      <h1>Getting Started Rubric Information</h1>
      <p>
        An SDK getting started scenario uses a single AWS service (or part of a service) to show new AWS developers how to get up and running using the SDK and the service.

        The rubric can be applied to any Getting Started <b>Draft</b> item. If the item is not
        in this state, you cannot run a rubric on it. 
        The Getting Started item also meets the following go/no-go criteria:
      </p>
      <ul>
        <li>The service does not have an existing getting-started-style scenario in the Code Library. If it does, move on to the next service.</li>
        <li>The service is included in the list of Code Examples Roadmap (see link in process page).</li>
        <li>The service is in the top 50 services based on data metrics or in the original candidate list.</li>
      </ul>

      <div>{renderFormFields()}</div>
      <button onClick={handleSave} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Calculate Rubric'}
      </button>

      {emptyFields.length > 0 && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          Please fill out all fields: {emptyFields.concat(!formData.itemId ? 'Item Id' : []).join(', ')}
        </p>
      )}
    </div>
  );
};

export default PageResearch;



