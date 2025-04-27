import React, { useEffect, useState } from 'react';
import { Container, Paper, Title, List, Anchor, Divider } from '@mantine/core';

import '../styles/pages/FadderInformation.css';

type Document = {
  id: string;
  title: string;
  url: string;
};

type Link = {
  id: string;
  name: string;
  url: string;
};

const FadderDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    // Sample data
    setDocuments([
      { id: '1', title: 'Introduktions-PDF', url: '/docs/intro.pdf' },
      { id: '2', title: 'Checklista för faddrar', url: '/docs/checklist.pdf' },
    ]);

    setLinks([
      { id: '1', name: 'Google Drive', url: 'https://drive.google.com/drive/u/0/folders/1x0sFMPvGYdPG9xM6f9BsE9Oxo_vi2huq' },
      { id: '2', name: 'Schemat', url: 'https://calendar.google.com/calendar/u/0/r/week/2025/4/28' },
    ]);
  }, []);

  return (
    <Container size="xs" my="md">
      <Title ta="center" mb="md" order={2}>
        Dokument och länkar
      </Title>

      <Paper withBorder shadow="sm" p="md" mb="md" radius="md">
        <Title order={4} mb="sm">Filer</Title>
        <List spacing="sm">
          {documents.map((doc) => (
            <List.Item key={doc.id}>
              <Anchor href={doc.url} target="_blank" rel="noopener noreferrer">
                📄 {doc.title}
              </Anchor>
            </List.Item>
          ))}
        </List>
      </Paper>

      <Divider my="md" />

      <Paper withBorder shadow="sm" p="md" radius="md">
        <Title order={4} mb="sm">Länkar</Title>
        <List spacing="sm">
          {links.map((link) => (
            <List.Item key={link.id}>
              <Anchor href={link.url} target="_blank" rel="noopener noreferrer">
                🔗 {link.name}
              </Anchor>
            </List.Item>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default FadderDocuments;