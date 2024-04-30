import React, { useState, useEffect } from 'react';
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import CollectionPreferences from "@cloudscape-design/components/collection-preferences";
import Link from "@cloudscape-design/components/link";
import './styles.css';

const PageCards = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://azxj9jtfhl.execute-api.us-east-1.amazonaws.com/Done');
      if (response.ok) {
        const responseDataString = await response.json();
        const match = responseDataString.match(/\[(.*?)\]/s); // Updated regex to include [ and ] characters
        if (!match || match.length < 1) {
          throw new Error('Failed to extract JSON data from response');
        }
        const jsonString = match[0]; // Use the entire match as JSON string
        console.log("Extracted JSON string:", jsonString);
        const cleanedJsonString = jsonString.replace(/\\/g, ''); // Remove escape characters
        console.log("Cleaned JSON string:", cleanedJsonString);
        
        const cleanedData = JSON.parse(cleanedJsonString);
        setItems(cleanedData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Cards
      onSelectionChange={({ detail }) =>
        setSelectedItems(detail?.selectedItems ?? [])
      }
      selectedItems={selectedItems}
      ariaLabels={{
        itemSelectionLabel: (e, t) => `select ${t.name}`,
        selectionGroupLabel: "Item selection"
      }}
      cardDefinition={{
        header: item => (
          <Link href="#" fontSize="heading-m">
            {item.Eng}
          </Link>
        ),
        sections: [
          {
            id: "description",
            header: "Description",
            content: item => item.Description
          },
          {
            id: "scouts",
            header: "Scouts",
            content: item => `${item.Scout} scouts`
          },
          {
            id: "follows",
            header: "Follows",
            content: item => `${item.Follow} follows`
          }
        ]
      }}
      cardsPerRow={[
        { cards: 3 }
      ]}
      items={items}
      loadingText="Loading resources"
      selectionType="multi"
      trackBy="Eng"
      visibleSections={["description", "scouts", "follows"]}
      empty={
        <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>No resources</b>
            <Button>Create resource</Button>
          </SpaceBetween>
        </Box>
      }
      filter={
        <TextFilter filteringPlaceholder="Find resources" />
      }
      header={
        <Header
          counter={
            selectedItems?.length
              ? `(${selectedItems.length}/${items.length})`
              : `(${items.length})`
          }
        >
          Completed Getting Started Items
        </Header>
      }
      pagination={
        <Pagination currentPageIndex={1} pagesCount={2} />
      }
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={{
            pageSize: 6,
            visibleContent: [
              "description",
              "scouts",
              "follows"
            ]
          }}
          pageSizePreference={{
            title: "Page size",
            options: [
              { value: 6, label: "6 resources" },
              { value: 12, label: "12 resources" }
            ]
          }}
          visibleContentPreference={{
            title: "Select visible content",
            options: [
              {
                label: "Main distribution properties",
                options: [
                  {
                    id: "description",
                    label: "Description"
                  },
                  { id: "scouts", label: "Scouts" },
                  { id: "follows", label: "Follows" }
                ]
              }
            ]
          }}
        />
      }
    />
  );
}

export default PageCards;
