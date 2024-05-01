import React, { useState, useMemo, useEffect } from 'react';
import { useTable } from 'react-table';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Oval } from 'react-loader-spinner';
import { Alert } from 'react-bootstrap';
import './styles.css';

Modal.setAppElement('#root');

const DraftComponent = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [data, setData] = useState([]);
  const [serverMessage, setServerMessage] = useState('');
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [formData, setFormData] = useState({
    summary: '',
    score: '',
    service : '',
    sme: '',
    language: '',
    id: '',
    title: '',
    engineer: '',
    guide: ''
  });

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns = useMemo(
    () => [
      { Header: 'Item Id', accessor: 'id' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Title', accessor: 'title' },
      { Header: 'Engineer', accessor: 'engineer' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Service', accessor: 'service' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <span onClick={() => handleViewDocument(row.original.id)} className="action-icon">
            <FontAwesomeIcon icon={faFileAlt} />
          </span>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  const fetchData = async () => {
    try {
      setFetchingData(true);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Draft' }),
      };

      const response = await fetch(
        'https://vrj1wxwztj.execute-api.us-east-1.amazonaws.com/reditems',
        requestOptions
      );
      
      if (!response.ok) {
        throw new Error('Failed to retrieve item data');
      }

      const responseDataString = await response.text();
      const match = responseDataString.match(/\[(.*?)\]/s);
      if (!match || match.length < 1) {
        throw new Error('Failed to extract JSON data from response');
      }
      const jsonString = match[0];
      const cleanedJsonString = jsonString.replace(/\\/g, '');
      
      const cleanedData = JSON.parse(cleanedJsonString);
      setData(cleanedData);
    
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFetchingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // THis sends a request to API Gateway and get back JSON Like 
  /*
    {
    "summary": "Discusses how to perform key use cases for AWS SNS",
    "score": "20",
    "service": "AWS SNS",
    "sme": "Baker, Mark <marbak@amazon.com>",
    "language": "Java",
    "id": "894943117",
    "title": "Getting Started with AWS SNS using the SDK",
    "engineer": "Madison Macdonald",
    "guide": "SNS Developer Guide"
  }
  */
  
  const handleViewDocument = async (docId) => {
    try {
      setLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: docId }),
      };
  
      const response = await fetch(
        'https://lnf8ty7zwe.execute-api.us-east-1.amazonaws.com/score',
        requestOptions
      );
  
      if (!response.ok) {
        throw new Error('Failed to retrieve item data');
      }
  
      const formDataJson = await response.json();
      const formDataJson2 = JSON.parse(formDataJson);
      console.log('formDataJson:', formDataJson2); // Log the formDataJson object
      console.log('id:', formDataJson2.id); // Log the formDataJson object
      console.log('score:', formDataJson2.score); // Log the formDataJson object
  
      // Update the state with the received data
      setFormData({
        id: formDataJson2.id,
        score: formDataJson2.score,
        type: formDataJson2.type,
        service: formDataJson2.service,
        sme: formDataJson2.sme,
        language: formDataJson2.language,
        url: formDataJson2.url,
        summary: formDataJson2.summary,
        engineer: formDataJson2.engineer,
        guide: formDataJson2.guide,
      });
  
      setIsFormModalOpen(true);
    } catch (error) {
      console.error('Error fetching research doc:', error);
    } finally {
      setLoading(false);
    }
  };
  

  // This handles if the item is approved or not. 
  const handleApprove = async () => {
    const fid = document.getElementById('id').value;
    const fscore = document.getElementById('score').value;
  
    try {
      const response = await fetch('https://xgfq8986t5.execute-api.us-east-1.amazonaws.com/Approve', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: fid,
          score: fscore,
          status: 'Approved',
        }),
      });
  
      if (response.ok) {
        const responseData = await response.text();
        setServerMessage(responseData);
        fetchData();
      } else {
        const responseData = await response.text();
        setServerMessage(responseData);
        fetchData();
      }
    } catch (error) {
      console.error('Error approving item:', error);
    }
  };

  const handleReject = async () => {
    console.log('Item Rejected', formData.itemId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Perform form submission logic here

    setIsSubmitting(false);
  };

  return (
    <div className="page-candidate-container">
      <div className="alert-container">
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible style={{ backgroundColor: '#f8d7da', color: '#721c24', borderColor: '#f5c6cb' }}>
          <FontAwesomeIcon icon={faTimes} style={{ marginRight: '5px' }} />
          This item has no Rubric information.
        </Alert>
      )}
      </div>
      {loading && (
        <div className="spinner-mask">
          <Oval
            color="#007bff"
            height={50}
            width={50}
            className="spinner"
          />
        </div>
      )}
      <div className="content">
        <h1 className="red-banner">Getting Started Draft Details</h1>
        <p className="description">
          At this stage, only Getting Started items with the status of <b>Draft</b> are displayed and can be either accepted or rejected.
        </p>
        <p className="description">
          The Getting Started team is responsible for discussing Getting Started items and granting approval for further progression.
        </p>
        <p className="description">
          To approve an item, click the Actions icon.
        </p>
        <p className="description">
          You cannot change the status of the item to <b>Approved</b> if you have not filled out rubric items and achieved a minimum score of 50%.  
          You can see score details when you click Actions. To enter rubric items, click <b>Enter Rubric information</b> in the Side Navigation.
        </p>
        <button onClick={fetchData} disabled={fetchingData} className="fetch-data-button">
          {fetchingData ? 'Fetching Data...' : 'Fetch Data'}
        </button>
      </div>
      <table {...getTableProps()} className="data-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps({ onClick: null })}
                className="data-row"
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      
      <Modal
        isOpen={isFormModalOpen}
        onRequestClose={() => setIsFormModalOpen(false)}
        contentLabel="Research Doc Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '80%',
            margin: 'auto',
            borderRadius: '0',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            background: '#f3f3f3',
          },
        }}
      >
        <button
          onClick={() => setIsFormModalOpen(false)}
          className="close-modal-button"
        >
          Close
        </button>
        <div className="form-container">
          <h2>Workflow Details</h2>
          <form onSubmit={handleSubmit}>
            <h3></h3>
            <label htmlFor='id' className="label">Item Id:</label>
            <input
              type='text'
              id='id'
              name='id'
              readOnly 
              value={formData.id}
              className="input-field"
            /><br />
            <label htmlFor='url' className="label">Reseach Doc URL:</label>
            <input
              type='text'
              id='url'
              name='url'
              readOnly
              value={formData.url}
              className="input-field"
            /><br />
             <label htmlFor='summary' className="label">Summary:</label>
            <input
              type='text'
              id='summary'
              name='summary'
              readOnly
              value={formData.summary}
              className="input-field"
            /><br />
            <label htmlFor='engineer' className="label">Engineer:</label>
            <input
              type='text'
              id='engineer'
              name='engineer'
              readOnly
              value={formData.engineer}
              className="input-field"
            /><br />
            <label htmlFor='service' className="label">Service:</label>
            <input
              type='text'
              id='service'
              name='service'
              readOnly
              value={formData.service}
              className="input-field"
            /><br />
            <label htmlFor='sme' className="label">SME:</label>
            <input
              type='text'
              id='sme'
              name='sme'
              readOnly
              value={formData.sme}
              className="input-field"
            /><br />
            <label htmlFor='lang' className="label">Language:</label>
            <input
              type='text'
              id='lang'
              name='lang'
              readOnly
              value={formData.language}
              className="input-field"
            /><br />
            <label htmlFor='guide' className="label">Guide:</label>
            <input
              type='text'
              id='guide'
              name='guide'
              readOnly
              value={formData.guide}
              className="input-field"
            /><br />
            <label htmlFor='score' className="label">Score:</label>
            <input
              type='text'
              id='score'
              name='score'
              readOnly
              value={formData.score}
              className="input-field"
            /><br />
            <br />
            <button type="button" onClick={handleApprove} className="approve-button">Approve</button>
            <button type="button" onClick={handleReject} className="reject-button">Reject</button>
          </form>
          {serverMessage && (
            <p className="server-message">{serverMessage}</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DraftComponent;




