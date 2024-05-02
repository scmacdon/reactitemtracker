import React, { useState, useMemo, useEffect } from 'react';
import { useTable } from 'react-table';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Oval } from 'react-loader-spinner';
import './PageCandidate.css';
import './commonstyles.css';
import { Alert } from 'react-bootstrap'; // Import Bootstrap Alert

Modal.setAppElement('#root');

const Candidate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    engineer: '',
    summary: '',
    service: '',
    service2: null,
    sme: '',
    language: '',
    guide: '',
    url: '',
    status: '',
    isIncludedInSOS: false,
  });
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

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
    data: data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
  });

  const fetchData = async () => {
    try {
      setFetchingData(true);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Approved' }), // Corrected status value
      };

      const response = await fetch(
        'https://vrj1wxwztj.execute-api.us-east-1.amazonaws.com/reditems',
        requestOptions
      );
      
      if (!response.ok) {
        throw new Error('Failed to retrieve item data');
      }

      const responseDataString = await response.text();
      const match = responseDataString.match(/\[(.*?)\]/s); // Updated regex to include [ and ] characters
      if (!match || match.length < 1) {
        throw new Error('Failed to extract JSON data from response');
      }
      const jsonString = match[0]; // Use the entire match as JSON string
      console.log("Extracted JSON string:", jsonString);
      const cleanedJsonString = jsonString.replace(/\\/g, ''); // Remove escape characters
      console.log("Cleaned JSON string:", cleanedJsonString);
      
      const cleanedData = JSON.parse(cleanedJsonString);
      setData(cleanedData); // Corrected setData function name
    
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFetchingData(false);
    }
   
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowDoubleClick = (row) => {
    setSelectedRowData(row.original);
    setIsModalOpen(true);
    setSelectedRow(row.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePaginationClick = (newPage) => {
    setCurrentPage(newPage);
  };

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
          'https://f75zwhtiob.execute-api.us-east-1.amazonaws.com/CanView',
          requestOptions
        );
    
        if (!response.ok) {
          throw new Error('Failed to retrieve item data');
        }
    
        const formDataJson = await response.json();
        const formDataJson2 = JSON.parse(formDataJson);
        console.log('formDataJson:', formDataJson2); // Log the formDataJson object
        console.log('id:', formDataJson2.id); // Log the formDataJson object
        console.log('status:', formDataJson2.status); // Log the formDataJson object
      
      setFormData({
        id: formDataJson2.id,
        title: formDataJson2.title,
        engineer: formDataJson2.engineer,
        type: formDataJson2.type,
        service: formDataJson2.service,
        sme: formDataJson2.sme,
        language: formDataJson2.language,
        url: formDataJson2.url,
        status: formDataJson2.status,
        summary: formDataJson2.summary,
      });

  
      setSelectedDocumentId(docId);
      setIsFormModalOpen(true);
    } catch (error) {
      console.error('Error fetching research doc:', error);
    } finally {
      setLoading(false); // Stop showing spinner mask
    }
  };

  const handleResearch = async () => {
    const fid = document.getElementById('id').value;
    try {
      const response = await fetch('https://ztzizvx246.execute-api.us-east-1.amazonaws.com/Status', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: fid,
          status: 'Research',
        }),
      });

      if (response.ok) {
        const responseData = await response.text();
        setServerResponse(responseData);
        console.log('item put into Research');
        fetchData();
      } else {
        const errorText = await response.text();
        setServerResponse('Approval failed: ' + response.status + ' - ' + errorText);
        console.error('Approval failed:', response.status, errorText);
      }
    } catch (error) {
      setServerResponse('Error approving item: ' + error.message);
      console.error('Error approving item:', error);
    }
  };

  const handleProgress = async () => {
    const fid = document.getElementById('id').value;
      try {
        const response = await fetch('https://ztzizvx246.execute-api.us-east-1.amazonaws.com/Status', {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: fid,
            status: 'InProgress',
          }),
        });

        if (response.ok) {
          const responseData = await response.text();
          setServerResponse(responseData);
          console.log('item put into Research');
          fetchData();
        } else {
          const errorText = await response.text();
          setServerResponse('Approval failed: ' + response.status + ' - ' + errorText);
          console.error('Approval failed:', response.status, errorText);
        }
      } catch (error) {
        setServerResponse('Error approving item: ' + error.message);
        console.error('Error approving item:', error);
      }
    };

    const handleDone = async () => {
      const fid = document.getElementById('id').value;
        try {
          const response = await fetch('https://ztzizvx246.execute-api.us-east-1.amazonaws.com/Status', {
            method: 'Post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: fid,
              status: 'Done',
            }),
          });
  
          if (response.ok) {
            const responseData = await response.text();
            setServerResponse(responseData);
            console.log('item put into Research');
            fetchData();
          } else {
            const errorText = await response.text();
            setServerResponse('Approval failed: ' + response.status + ' - ' + errorText);
            console.error('Approval failed:', response.status, errorText);
          }
        } catch (error) {
          setServerResponse('Error approving item: ' + error.message);
          console.error('Error approving item:', error);
        }
      };

  return (
    <div>
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
      <h1>Getting Started Candidate Details</h1>
      <p>At this stage, the status of all Getting Started items can be <b>Approved</b>, <b>Research</b>, <b>InProgress</b>, or <b>Done</b>.</p>
      <p>You can modify the status of an item by clicking the icon in the Action column.</p>
      <p>You can set the status from <b>Approved</b> to <b>Research</b> which means the item is still in the research mode. 
      When you are ready to work on the item, set it from <b>Research</b> to <b>InProgress</b>. While in this stage, 
      you can do most of the development work, such as creating a the code in given programming language, writing the 
      general Readme and the Eng spec (if the item is a Scout).</p>
      <p>In addition, write the tests for the code, linter the code, 
      hook the item into SOS, and build a cloud desktop build. If you are implementing a Follow item, use AI (ie, Ailly) to convert the example from the 
      Scout Language to the Follow langauge 
      </p>
      <button onClick={fetchData} disabled={fetchingData}>
        {fetchingData ? 'Fetching Data...' : 'Fetch Data'}
      </button>
      <table {...getTableProps()} style={{ borderSpacing: '0', width: '100%' }}>
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
                {...row.getRowProps()}
                onDoubleClick={() => handleRowDoubleClick(row)}
                onClick={() => setSelectedRow(row.id)}
                style={{
                  cursor: 'pointer',
                  background: row.id === selectedRow ? '#f2f2f2' : 'white',
                }}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => handlePaginationClick(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button
          onClick={() => handlePaginationClick(currentPage + 1)}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
        >
          Next
        </button>
      </div>

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
        <button onClick={() => setIsFormModalOpen(false)} className="close-modal-button">
          Close
        </button>
        <div className="form-container">
          {loading && (
            <div className="spinner-mask">
              <Oval color="#007bff" height={50} width={50} className="spinner" />
            </div>
          )}
          {formData && (
            <div>
              <h2>Candidate Research Doc Template</h2>
              <form>
                <h3>Workflow Details</h3>
                <label htmlFor='id' className="label">Item Id:</label>
                <input
                  type='text'
                  id='id'
                  name='id'
                  readOnly 
                  value={formData.id} // Bind directly to formData.id
                  className="input-field"
                /><br />

                <label htmlFor='ftitle' className="label">Title:</label>
                <input
                  type='text'
                  id='ftitle'
                  name='ftitle'
                  readOnly 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                /><br />
                <label htmlFor='feng' className="label">Engineer:</label>
                <input
                  type='text'
                  id='feng'
                  name='feng'
                  readOnly 
                  value={formData.engineer} // Bind directly
                  onChange={(e) => setFormData({ ...formData, engineer: e.target.value })}
                  className="input-field"
                /><br />
                <label htmlFor='fservice' className="label">AWS Service:</label>
                <input
                  type='text'
                  id='fservice'
                  name='fservice'
                  readOnly 
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="input-field"
                /><br />
                <label htmlFor='fsme' className="label">Subject Matter Expert:</label>
                <input
                  type='text'
                  id='fsme'
                  name='fsme'
                  readOnly 
                  value={formData.sme}
                  onChange={(e) => setFormData({ ...formData, sme: e.target.value })}
                  className="input-field"
                /><br />
                <label htmlFor='flang' className="label">Language:</label>
                <input
                  type='text'
                  id='flang'
                  name='flang'
                  readOnly 
                  value={formData.language} // Bind directly to formData.id
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="input-field"
                /><br />
                <label htmlFor='summary' className="label">Summary:</label>
                <input
                  type='text'
                  id='summary'
                  name='summary'
                  readOnly 
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="input-field"
                /><br /> 
              </form>
              <button onClick={handleResearch}>Research</button>
              <button onClick={handleProgress}>In-Progress</button>
              <button onClick={handleDone}>Done</button>
              <div>{serverResponse}</div> {/* Display server response here */}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Candidate;
