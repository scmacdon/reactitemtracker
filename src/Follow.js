import React, { useState } from 'react';

const Follow = () => {
  const [itemId, setItemId] = useState('');
  const [itemData, setItemData] = useState({});
  const [formErrors, setFormErrors] = useState({ itemId: '' });
  const [isFetching, setIsFetching] = useState(false);
  const [isCreatingFollow, setIsCreatingFollow] = useState(false); // Add state for creating follow

  const handleInputChange = (e) => {
    const { value } = e.target;
    setItemId(value);
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      itemId: '',
    }));
  };

  const handleGetItem = async (e) => {
    e.preventDefault();

    const itemIdFromInput = itemId.trim();

    try {
      setIsFetching(true);

      const response = await fetch(`http://localhost:8080/api/items/${itemIdFromInput}`);

      if (!response.ok) {
        throw new Error('Failed to retrieve item data');
      }

      const responseDataString = await response.json();
      setItemData(responseDataString);
    } catch (error) {
      console.error('Error retrieving item data:', error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleCreateFollow = async (e) => {
    e.preventDefault();
    try {
      setIsCreatingFollow(true); // Set creating follow state to true

      const { Engineer, Language, ...dataToSend } = itemData; // Only sending Engineer and Language
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      };

      const response = await fetch('https://4zzkjzebl8.execute-api.us-east-1.amazonaws.com/Follow', requestOptions);

      if (response.ok) {
        const successText = await response.text();
        alert(successText);
      } else {
        throw new Error('Failed to update item data');
      }
    } catch (error) {
      console.error('Error updating item:', error.message);
    } finally {
      setIsCreatingFollow(false); // Reset creating follow state
    }
  };

  return (
    <div>
      <h1>Create a Getting Started Follow</h1>
      <p>You can create a follow item by entering the id value of the item you want to base a follow on. Modify the Engineer and programming language fields and click <b>Create Follow</b>. Other details should remain the same. A new item that represents a follow is created.</p>
      <p>You cannot create a follow based on a <b>Draft</b> item. A follow is put automatically into <b>Research</b> status and has the same score as the Scout item.</p>
      <form>
        <div>
          <label htmlFor="itemId">Enter Item ID:</label>
          <input type="text" id="itemId" name="itemId" value={itemId} onChange={handleInputChange} />
          <span className="error-message">{formErrors.itemId}</span>
        </div>

        <div>
          <button type="button" onClick={handleGetItem} disabled={isFetching}>
            {isFetching ? 'Fetching Data...' : 'Get Follow Data'}
          </button>
        </div>
      </form>

      {Object.keys(itemData).length > 0 && (
        <form onSubmit={handleCreateFollow}>
          {Object.keys(itemData).map((key) => (
            <div key={key}>
              <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type="text"
                id={key}
                name={key}
                readOnly={key !== 'engineer' && key !== 'language'} // Make all fields readonly except Engineer and Language
                value={itemData[key]}
                onChange={(e) => setItemData({ ...itemData, [key]: e.target.value })}
              />
            </div>
          ))}
          <div>
            <button type="submit" disabled={isCreatingFollow}> {/* Disable button during follow creation */}
              {isCreatingFollow ? 'Creating Follow...' : 'Create Follow'} {/* Change button text based on loading state */}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Follow;


