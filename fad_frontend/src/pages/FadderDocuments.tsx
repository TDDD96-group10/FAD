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
    //sample data
    setDocuments([
      { id: '1', title: 'Introduktions-PDF', url: '/docs/intro.pdf' },
      { id: '2', title: 'Checklista för faddrar', url: '/docs/checklist.pdf' },
    ]);

    setLinks([
      { id: '1', name: 'Google Drive', url: 'https://drive.google.com' },
      { id: '2', name: 'Schemat', url: 'https://schema.link' },
    ]);
  }, []);

  return (
    <Container size={800} my={40}>
      <Title ta="center" mb="lg">
        Dokument och länkar
      </Title>

      <Paper withBorder shadow="md" p={30} mb="lg" radius="md">
        <Title order={4} mb="sm">Filer</Title>
        <List spacing="xs">
          {documents.map((doc) => (
            <List.Item key={doc.id}>
              <Anchor href={doc.url} target="_blank" rel="noopener noreferrer">
                📄 {doc.title}
              </Anchor>
            </List.Item>
          ))}
        </List>
      </Paper>

      <Divider my="xl" />

      <Paper withBorder shadow="md" p={30} radius="md">
        <Title order={4} mb="sm">Länkar</Title>
        <List spacing="xs">
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