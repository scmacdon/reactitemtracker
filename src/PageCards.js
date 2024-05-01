import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const CustomCard = ({ item, onClick }) => {
  return (
    <div className="custom-card" onClick={() => onClick(item.Eng)}>
      <div className="card-header">
        <h3>{item.Eng}</h3>
      </div>
      <div className="card-body">
        <p>{item.Description}</p>
        <p>{`${item.Scout} scouts`}</p>
        <p>{`${item.Follow} follows`}</p>
      </div>
    </div>
  );
};

const PageCards = () => {
  const [cardItems, setCardItems] = useState([]);
  const [tableItems, setTableItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://azxj9jtfhl.execute-api.us-east-1.amazonaws.com/Done');
      if (response.ok) {
        const responseDataString = await response.json();
        const match = responseDataString.match(/\[(.*?)\]/s);
        if (!match || match.length < 1) {
          throw new Error('Failed to extract JSON data from response');
        }
        const jsonString = match[0];
        const cleanedJsonString = jsonString.replace(/\\/g, '');
        const cleanedData = JSON.parse(cleanedJsonString);
        setCardItems(cleanedData); // Set card data
        setTableItems(cleanedData); // Set table data
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleName = async (name) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eng: name }), // Send 'eng' instead of 'name'
      };

      const response = await fetch(
        'https://5n85fbn863.execute-api.us-east-1.amazonaws.com/Complete',
        requestOptions
      );

      if (!response.ok) {
        throw new Error('Failed to retrieve item data');
      }

      const responseDataString = await response.text();
      console.log("JSON "+responseDataString)
      const match = responseDataString.match(/\[(.*?)\]/s);
      if (!match || match.length < 1) {
        throw new Error('Failed to extract JSON data from response');
      }
      const jsonString = match[0];
      const cleanedJsonString = jsonString.replace(/\\/g, '');
      const cleanedData = JSON.parse(cleanedJsonString);
      setTableItems(cleanedData); // Update the table data only
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = useMemo(
    () => [
      { Header: 'Item Id', accessor: 'id' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Title', accessor: 'title' },
      { Header: 'Engineer', accessor: 'engineer' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Service', accessor: 'service' },
    ],
    []
  );

  return (
    <>
      <h3>Getting Started Done Items Information</h3>
      <p>Click on the name in the Card to get details about the Getting Started items in <b>Done</b> state</p> 
      <div className="cards-container">
        {cardItems.map((item, index) => (
          <CustomCard key={index} item={item} onClick={handleName} />
        ))}
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.accessor}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableItems.map((item, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column.accessor}>{item[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PageCards;
