import React, { useState, useEffect } from 'react';
import './styles.css';

const PageUpdate = () => {
  const [itemId, setItemId] = useState('');
  const [itemData, setItemData] = useState({});
  const [formErrors, setFormErrors] = useState({ itemId: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setItemId(value);
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      itemId: '',
    }));
  };

  useEffect(() => {
    if (Object.keys(itemData).length > 0) {
      setItemId(itemData.itemId); // Set the itemId from server data when it's fetched
    }
  }, [itemData]);

  const handleGetItem = async (e) => {
    e.preventDefault();

    const itemIdFromInput = itemId.trim();

    try {
      setIsFetching(true);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: itemId }),
      };

      const response = await fetch(
        'https://j1rij6x39h.execute-api.us-east-1.amazonaws.com/SingleItem',
        requestOptions
      );

      if (!response.ok) {
        throw new Error('Failed to retrieve item data');
      }

      const responseDataString = await response.json();
    
      const match = responseDataString.match(/\[([^[\]]+)\]/);
      if (!match || match.length < 2) {
        throw new Error('Failed to extract JSON data from response');
      }
      const jsonString = match[1];
      const cleanedJsonString = jsonString.replace(/\\/g, '');
      const cleanedData = JSON.parse(cleanedJsonString);
          
      setItemData(cleanedData);
    } catch (error) {
      console.error('Error retrieving item data:', error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const updateFormData = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);

      const { sos, status, ...dataToSend } = itemData;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      };

     // const response = await fetch(
     //   'http://localhost:8080/api/items/updateitem',
     //   requestOptions
     // );

     const response = await fetch(
        'https://tvo3zd1on3.execute-api.us-east-1.amazonaws.com/updateitem',
        requestOptions
      );

      if (response.ok) {
        const successText = await response.text();
        alert(successText);
      } else {
        throw new Error('Failed to update item data');
      }
    } catch (error) {
      console.error('Error updating item:', error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreateFollow = () => {
    console.log('Create Follow clicked!');
  };

  return (
    <div>
      <h1>Update a Getting Started Item</h1>
      <p>You can update a getting started item by entering the Id value of the item. </p>
      <p>You can only update <b>Draft</b> items. Once an item is Approved, you cannot update it. </p>
      <form>
        <div>
          <label htmlFor="itemId">Enter Item ID:</label>
          <input
            type="text"
            id="itemId"
            name="itemId"
            value={itemId}
            onChange={handleInputChange}
          />
          <span className="error-message">{formErrors.itemId}</span>
        </div>

        <div>
          <button type="button" onClick={handleGetItem} disabled={isFetching}>
            {isFetching ? 'Fetching Data...' : 'Get Item Data'}
          </button>
        </div>
      </form>

      {Object.keys(itemData).length > 0 && (
        <form onSubmit={updateFormData}>
          {Object.keys(itemData)
            .filter((key) => key !== 'sos') // Filter out SOS field
            .filter((key) => key !== 'status') // Filter out status field
            .sort()
            .map((key) => (
              <div key={key}>
                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={itemData[key]}
                  readOnly={key === 'id'} // Make only the itemId field read-only
                  onChange={(e) => setItemData({ ...itemData, [key]: e.target.value })}
                />
              </div>
            ))}
          <div>
            <button type="submit" disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Item'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PageUpdate;

