import React, { useState } from 'react';
import {
  Stack,
  Button,
  ScrollArea,
  Text,
  Anchor,
  Title,
  Box,
} from '@mantine/core';
import '../styles/pages/FadderDocuments.css';

// Update the type to reflect that these are just hyperlinks, not file links
type LinkEntry = {
  title: string;
  url: string; // URL for the hyperlink, not necessarily a file
};

const FadderDocumentsPage: React.FC = () => {
  // Sample data - these are now just hyperlinks, not file links
  const [links, setLinks] = useState<LinkEntry[]>([
    {
      title: 'Slack',
      url: 'https://example.com/link1',
    },
    {
      title: 'Drive',
      url: 'https://example.com/link2',
    },
    {
      title: 'Discord',
      url: 'https://example.com/link3',
    },
    // Add more links as needed
  ]);

  const handleButtonClick = () => {
    // Placeholder for navigation logic to a page with files
    // This will be implemented later to navigate to another page
    console.log('Button clicked! Navigate to files page...');
  };

  return (
    <Stack maw={600} mx="auto" p="md">
      <Title order={2}>Dokument</Title>
      {/* Wrap Button and ScrollArea in a Box with left margin for indentation */}
      <Box ml={40}>
        <Button
          onClick={handleButtonClick}
          variant="filled"
          color="blue"
          w={140} // Slightly wider to ensure text visibility
          h={48} // Fixed height to make it taller
          mt="xl" // Adds padding above the button
          mb="xl" // Adds padding below the button
        >
          PDFer
        </Button>
        <ScrollArea h={400} type="auto" scrollbarSize={8}>
          <Stack gap="xl">
            {links.map((link, index) => (
              <Anchor
                key={index}
                href={link.url}
                target="_blank"
                underline="hover"
              >
                <Text size="md" c="blue">
                  {link.title}
                </Text>
              </Anchor>
            ))}
          </Stack>
        </ScrollArea>
      </Box>
    </Stack>
  );
};

export default FadderDocumentsPage;