import React, { useState, useEffect } from 'react';
import SideNavigation from "@cloudscape-design/components/side-navigation";
import AddDetails from './AddDetails';
import DraftComponent from './Draft';
import Candidate from './Candidate';
import Page4 from './Page4';
import PageDoc from './PageDoc';
import PageUpdate from './PageUpdate';
import PageCards from './PageCards';
import PageResearch from './Rubric'; 
import Follow from './Follow'; 
import './styles.css'; // Import styles.css here

const App = () => {
  const [activeHref, setActiveHref] = useState("#/pageDoc"); // Set default to #/pageDoc
  const [workflowItemCount, setWorkflowItemCount] = useState(0);

  const handleNavigation = (event) => {
    if (!event.detail.external) {
      event.preventDefault();
      setActiveHref(event.detail.href);
    }
  };

  useEffect(() => {
    const fetchWorkflowItemCount = async () => {
      try {
        const response = await fetch('https://7bip10ir4c.execute-api.us-east-1.amazonaws.com/Count');
        const count = await response.json();
        setWorkflowItemCount(count);
      } catch (error) {
        console.error('Error fetching workflow item count:', error);
      }
    };

    fetchWorkflowItemCount();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <SideNavigation
        activeHref={activeHref}
        header={{ href: "#/", text: "Getting Started Tracking App" }}
        onFollow={handleNavigation}
        items={[
          { type: "link", text: "Getting Started Process", href: "#/pageDoc" },
          { type: "link", text: "Enter Getting Started Details", href: "#/AddDetails" },
          { type: "link", text: "Enter Rubric information", href: "#/PageResearch" },
          { type: "link", text: "Update Item", href: "#/pageUpdate" },
          { type: "link", text: "Create a Follow", href: "#/Follow" },
          { type: "link", text: "View Getting Started Drafts", href: "#/DraftComponent" },
          { type: "link", text: "View Getting Started Candidates", href: "#/Candidate" },
          { type: "link", text: "Visual instructions", href: "#/page4" },
          { type: "divider" },
          {
            type: "link",
            text: `View Closed Getting Started (${workflowItemCount})`, href: "#/PageCards"
            
          },
        ]}
      />
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Render only the content of the active page */}
        {activeHref === "#/AddDetails" && <AddDetails />}
        {activeHref === "#/DraftComponent" && <DraftComponent />}
        {activeHref === "#/Candidate" && <Candidate />}
        {activeHref === "#/Follow" && <Follow />}
        {activeHref === "#/page4" && <Page4 />}
        {activeHref === "#/pageDoc" && <PageDoc />}
        {activeHref === "#/pageUpdate" && <PageUpdate />}
        {activeHref === "#/PageCards" && <PageCards />}
        {activeHref === "#/PageResearch" && <PageResearch />}
      </div>
    </div>
  );
};

export default App;