import React from 'react';

const PageDoc = () => {
  return (
    <div>
      <h1>Getting Started Scenario Process</h1>
      <h5>This application tracks Getting Started Scenario items through these states: Draft, Approved, Research, InProgress, and Done. 
        A Getting Started scenario is defined here: <a href="https://quip-amazon.com/J9Z4AurJMoIX#EUO9AAUELOB" target="_blank" rel="noopener noreferrer">
        Guidelines for SDK  Getting Started scenarios.</a></h5>
      

      <p>The steps outlined below detail the process for creating a Getting Started scenario.</p>
      <p>
        1. Pull the next service off the roadmap <a href="https://quip-amazon.com/xItSADd94kkn/Code-Examples-Roadmap-WIP#temp:C:BAQ58cc647b947148ea8f4277e00" target="_blank" rel="noopener noreferrer">
          Code Examples Roadmap</a>. The managers are responsible to updating this document and providing a clear roadmap of AWS Services. 
        
      </p>
      <p>
        2. Determine a subject matter expert (sme) for the Getting Started scenario example. You can use this tool <a href="https://prod.virtualsmiley.docs.aws.a2z.com/#/services" target="_blank" rel="noopener noreferrer">
          Virtual Smiley.
        </a>
      </p>
      <p>
        3. Look for "Getting Started" topics for that service. Find and read the service documentation, 
        and use the service to understand what it does. You can use AI (e.g., Ailly) to help draft up the Code Details 
        and ensure that you have captured the key service operations. Next, create a Research QUIP document 
        and fill in the "Getting Started Details" and "Code Details" sections. Present the Research QUIP document
         to the service team when you meet with them (see step 5).</p>  
        
      <p>
        You enter the Research Doc URL into this application when you enter Getting Started details. This is required to 
        enter an Getting Started item into this system. To see a Research doc example, 
        click here: <a href="https://quip-amazon.com/rmwUAtHv0B16/AWS-Systems-Manager-SDK-getting-started-scenario-reseach-doc" target="_blank" rel="noopener noreferrer">
        AWS Systems Manager getting started scenario reseach doc.</a>
      </p>
      <p>
        4. Enter the Getting Started details in the <i>Enter Getting Started Details</i> section of this application. 
        This generates a <b>unqiue item id</b> value that you can use to track the item through the various states. 
      </p>
      <p>
        5. Set up a call with the AWS service team and present the Research QUIP document. Roll in any feedback that you receive 
        from the AWS service team into the Research doc. In addition, talk about the benefits of SOS and getting the 
        Code Examples chapter into their guides. Show the team the catalog of existing SOS examples. 
        Confirm that the service team will onboard to SoS when the scenario is done. If there is a reason why the 
        team will not add SOS, track that reason and inform the Getting Started team at the next meeting. 
        This information may impact the Rubic score.</p>
          
      <p>
        6. Enter the rubric information in the "Enter Rubric Information" section to determine if this Getting Started scenario 
        has merit to proceed. The information you gathered from the AWS team, such as whether the team will onboard to SOS, 
        will help with the rubric. The rubric is for triaging Getting Started scenarios. 
        If the item scores 50% or higher, you can proceed with the item. 
      </p>
      <p>
        7. Discuss the draft item along with feedback from the AWS service team to the next Getting Started meeting. 
        It's during that meeting, the getting started item will be accepted or rejected. 
        <u>You cannot approve an item without the Getting Started team input.</u> 
      </p>
      <p>
        8. If the getting started team approves the item, go to the <i>View Getting Started Drafts</i> section and look for your item. 
        Click on the <b>Actions</b> column and then approve the item. This will put the item into the <b>Approved</b> state.   
      </p> 
      <p>
        9. You can view all <b>Approved</b> items (or higher) in the <i>View Getting Started Candidates</i> section.  
        From the <b>Approve</b> state, you can put the item into the <b>Research</b> state. While the item is in this state, 
        you can complete the research. When you feel you completed the research, put the item into <b>InProgress</b>. 
      </p>  
      <p>
      While the item is in the <b>InProgress</b> state, you perform most of the work such as creating a proof of concept (POC) 
      of the code in the scout language, writing the general README and the engineering specification. In addition, write the tests 
      for the code, lint the code, hook the item into the SOS system, and perform a cloud build. It's important that you verify 
      that the code works by getting another Getting Started team member to successfully run your code. When all of that work is done, 
      create a pull request (PR).    
      </p>  
      <p>
        10. Once the PR is merged and you verify the item is live in the AWS Code Library, bring this information to the next Getting Started meeting. 
        Discuss with the team. If team agrees, put the item into the <b>Done</b> state. <u>You cannot put an item into the 
        Done state without team input</u>.</p>
        
        <p>In addition,
        update the road map document so we can keep the road map up-to-date. See  <a href="https://quip-amazon.com/xItSADd94kkn/Code-Examples-Roadmap-WIP#temp:C:BAQ58cc647b947148ea8f4277e00" target="_blank" rel="noopener noreferrer">
        Code Examples Roadmap. </a>
      </p> 
      <p>
        11. At the next getting started weekly meeting, assign follows to the members of the getting started code example team.
      </p> 
      <p>
        12. Enter the follow into this application in the <i>Create Follow</i> section and enter the Id of the item for which the follow is based on. 
        Modify details such as the Engineer that will implement the follow and the follow programming language. The other details remain 
        the same. The system does not require a Rubic check for follow because that information was completed during the scout.</p> 
      <p>
        A follow is assigned an Id value and automatically put into the <b>Research</b> state. Put the follow item into the various states 
        as you work through the item. Use AI (ie, Ailly) to help you translate the follow into other SDK languages.
      </p>
      <p>
        13. If the item is a scout (and not a follow), have a follow up meeting with the AWS team to discuss final details of hooking in the SOS chapter into the AWS Service Guide.
      </p>
      <p>
        14. This system displays <b>Done</b> items in the <i>All Getting Started items</i> section Both Scouts and Follows are tracked. 
      </p>
    </div>
  );
};

export default PageDoc;
