import React from 'react';

const PageDoc = () => {
  return (
    <div>
      <h1>Getting Started Scenario Process</h1>
      <h5>Getting Started scenario guidelines and the development process are defined here: <a href="https://quip-amazon.com/FhZaAaKOSAIf/AWS-Getting-Started-Scenarios-Guidelines" target="_blank" rel="noopener noreferrer">
        Guidelines for SDK  Getting Started scenarios.</a></h5>
      

      <p>This tool tracks a getting started scenario through the different dev phases:</p>
      <ul>
        <li>Getting Started Research Phase</li>
        <li>Development Phase</li>
        <li>Publication phase</li>
      </ul>
      <p>The full details about each phase are located in the above document. 
        The following sections describe how to use this app during each phase for tracking purposes.</p>
      
      <h3>Research  Phase</h3>
      <p>Enter the Getting Started details in the <i>Enter Getting Started Details</i> section of this application. 
        This generates a <b>unqiue item id</b> value that you can use to track the item through the various states.</p>

      <p>
        Enter the Research Doc URL into this application when you enter Getting Started details. This is required to 
        enter an Getting Started item into this system. 
      </p>  

      <p>
        Enter the rubric information in the "Enter Rubric Information" section to determine if this Getting Started scenario 
        has merit to proceed. The information you gathered from the AWS team, such as whether the team will onboard to SOS, 
        will help with the rubric. The rubric is for triaging Getting Started scenarios. 
        If the item scores 50% or higher, you can proceed with the item. 
      </p>

      <p>
        Discuss the draft item along with feedback from the AWS service team to the next Getting Started meeting. 
        It's during that meeting, the getting started item will be accepted or rejected. 
        <u>You cannot approve an item without the Getting Started team input.</u> This sends the item into Development phase.
      </p>
    
      <h3>Development  Phase</h3>
     <p>
        You can view all <b>Approved</b> items (or higher) in the <i>View Getting Started Candidates</i> section.  
        From the <b>Approve</b> state, you can put the item into the <b>Research</b> state. While the item is in this state, 
        you can complete the research. When you feel you completed the research, put the item into <b>InProgress</b>. 
      </p>  
      <p>
      While the item is in the <b>InProgress</b> state, you perform most of the work such as creating a proof of concept (POC) 
      of the code in the scout language, writing the general README and the engineering specification. In addition, write the tests 
      for the code, lint the code, hook the item into the SOS system, and perform a cloud build. When all of that work is done, 
      create a pull request (PR).    
      </p>  
            
      <h3>Publication  Phase</h3>
      <p>
       Once the PR is merged and you verify the item is live in the AWS Code Library, bring this information to the next Getting Started meeting. 
       Discuss with the team. If team agrees, put the item into the <b>Done</b> state. <u>You cannot put an item into the 
       Done state without team input</u>.</p>
          
      <p>
        Enter the follows into this application in the <i>Create Follow</i> section and enter the Id of the item for which the follow is based on. 
        Modify details such as the Engineer that will implement the follow and the follow programming language. The other details remain 
        the same. The system does not require a Rubic check for follow because that information was completed during the scout.</p> 
    </div>
  );
};

export default PageDoc;
