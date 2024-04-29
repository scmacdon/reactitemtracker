import React from 'react';

const PageDoc = () => {
  return (
    <div>
      <h1>Getting Started Scenario Process</h1>
      <p>A SDK getting started scenario is defined in this Quip <a href="https://quip-amazon.com/J9Z4AurJMoIX#EUO9AAUELOB" target="_blank" rel="noopener noreferrer">
        Guidelines for SDK  Getting Started scenarios.
      </a></p>

      <p>The following steps describe the process for creating a Getting Started scenario.</p>
      <p>
        1. Pull the next service off the roadmap <a href="https://quip-amazon.com/xItSADd94kkn/Code-Examples-Roadmap-WIP#temp:C:BAQ58cc647b947148ea8f4277e00" target="_blank" rel="noopener noreferrer">
          Code Examples Roadmap.
        </a>
      </p>
      <p>
        2. Determine an owner for the Getting Started scenario/service example. You can use this tool <a href="https://prod.virtualsmiley.docs.aws.a2z.com/#/services" target="_blank" rel="noopener noreferrer">
          Virtual Smiley.
        </a>
      </p>
      <p>
        3. Look for getting started topics for that service. Find and read the service docs, use the service a bit to understand what it does. You can 
        use Ailly to draft up a blue print as well to use as a starting point. Ailly will let you know if you have captured key use cases for a service.  
      </p>
      <p>
        4. Enter the Getting Started details in the <i>Enter Getting Started Details</i> section.
      </p>
      <p>
        5. Enter rubric information in the <i>Enter Rubric information</i> section to determine if this use cases has merit to proceed.
        The rubric is for triaging potential candidates for Getting Started code examples. 
      </p>
      <p>
        6. If the item is 50% or higher, you can proceed with the item. Set up a call with the AWS service team and talk about the benefits of SOS and getting the Code Examples chapter into their guides. 
      Present your plan to the team during your call with them. Include the catalog of existing examples in discussion and how they will be handled as part of the overall project.
      Confirm the team will onboard to SoS when the scenario is done.
      </p>
      <p>
        7. Bring the new draft item along with feedback from the AWS service team to the next Getting Started meeting. It's during that meeting, the getting started 
        item will be accepted or rejected. 
      </p>
      <p>
        8. If the getting started team approves the item, go to the <i>View Getting Started Drafts</i> section and look for your item. Click on the <b>Actions</b> column and then 
        approve the team. This will put the item into the <b>Approved</b> state.   
      </p> 
      <p>
        9. You can view all <b>Approved</b> items (or higher) in the <i>View Getting Started Candidates</i> section.  
        From the <b>Approve</b> state, you can put the item into the <b>Research</b> state. While the item is in this state, you can complete the research. 
        When you feel you completed the research, put the item into <b>In-Progress</b>. 
      </p>  
      <p>
        While the item is in this state, you can do most of the work such as creating a POC of the code in the scout language, 
        writing the general Readme and the Eng spec. In addition, write the tests for the code, linter the code, hook the item into SOS, 
        perform a cloud build. When all of that work is done, create a PR.    
      </p>  
      <p>
        10. Once the PR is merged and you verify the item is live in the AWS Code Library, put the item into the <b>Done</b> state. In addition,
        update the road map document so we can keep the road map up-to-date. See  <a href="https://quip-amazon.com/xItSADd94kkn/Code-Examples-Roadmap-WIP#temp:C:BAQ58cc647b947148ea8f4277e00" target="_blank" rel="noopener noreferrer">
        Code Examples Roadmap. </a>
      </p> 
      <p>
        11. In Github, create an Epic with the language follows that will be implemented. At the next getting started weekly meeting, 
        assign follows to the members of the getting started code example team.
      </p> 
      <p>
        12. Enter the Follow into this application in the <i>Create Follow</i> section and enter the Id of the item for which the follow is based on. 
        Specify Follow details such as the Engineer that will implement the follow and the follow programming language. The other details should 
        remain the same. The system does not require a Rubic check for follow because that information was completed during the scout. 
        A follow is put automatically into <b>Research</b> status and has the same score as the Scout item. Put the follow item into the various states as you work through the item.
      </p>
      <p>
        Use Ailly to help you translate the follow into other SDK languages.
      </p>
      <p>
        13. If the item is a scout (and not a follow), have a follow up meeting with the AWS team to discuss final details of hooking in the SOS chapter into the AWS Service Guide.
      </p>
      <p>
        14. This system displays completed items in the <i>All Getting Started items</i> section Both Scouts and Follows are tracked. 
        For an item to show up in this view, it must be in <b>Done</b> status. 
      </p>
    </div>
  );
};

export default PageDoc;
