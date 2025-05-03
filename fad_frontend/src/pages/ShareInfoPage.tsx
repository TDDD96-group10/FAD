import React, { useState } from 'react';
import {
  Button,
  Title,
  Group,
  Text,
  Container,
  Paper,
  List,
  Anchor
} from '@mantine/core';
import FADheader from '../components/Header';
import CreateFolderCard from '../components/CreateFolderCard';
import AddFileFormCard from '../components/AddFileFormCard';
import FolderListCard from '../components/FoldersListCard';
import FolderContentCard from '../components/FolderContentCard';
import { useApi,callApi } from "../hooks/useApi";
import { apiClient } from "../api/ApiClient";


type FileEntry = {
  title: string;
  fileName: string;
  fileUrl: string;
};

const ShareInfoPage: React.FC = () => {
  const { data, loading, error } = useApi(() => apiClient.portal.portalFilenamesList());
  const [showForm, setShowForm] = useState(false);
  const handleShareClick = () => setShowForm((prev) => !prev);




  return (
    <FADheader> 
    <Container size={800} my={40}>
      <Title ta="center" mb={10}>
        Dela Information
      </Title>
      <Text c="dimmed" ta="center" mb={20}>
        Här kan du skapa mappar och lägga till pdf'er för ditt fadderi
      </Text>
      <Group justify="center" mb="md">
        <Button variant="outline" color="blue" size="xl" onClick={handleShareClick}>
          Lägg ut pdf
        </Button>
      </Group>


      {showForm && <AddFileFormCard />}

         <Paper withBorder shadow="sm" p="md" mb="md" radius="md">
              <Title order={4} mb="sm">Filer</Title>
              <List spacing="sm">
                {data?.map((doc) => (
                  <List.Item key={doc.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Anchor href={"http://127.0.0.1:8000/portal/pdf_view/"+ doc.id} target="_blank" rel="noopener noreferrer">
                      📄 {doc.file_name}
                    </Anchor>

                    <button
                      onClick={() => handleDelete(doc.id)}
                      style={{ marginLeft: "1rem", background: "transparent", border: "none", cursor: "pointer", color: "red" }}
                      title="Delete"
                    >
                      ❌
                    </button>
                  </List.Item>
                ))}
              </List>
            </Paper>

    
    </Container>
    </FADheader> 
  );
};

export default ShareInfoPage;