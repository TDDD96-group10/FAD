import React, { useState } from 'react';
import {
  Button,
  Title,
  Group,
  Text,
  Container,
  Paper,
  List,
  Anchor,
  TextInput
} from '@mantine/core';
import FADheader from '../components/header';
import AddFileFormCard from '../components/AddFileFormCard';
import { useApi, callApi } from "../hooks/useApi";
import { apiClient } from "../api/ApiClient";
import {PostLink} from "../api/Api";
import { useSmartState } from "../hooks/useSmartState";




const ShareInfoPage: React.FC = () => {
  const { data, loading, error } = useApi(() => apiClient.portal.portalFilesList());
  const [link, setLink] = useSmartState<PostLink>({
    author: "",
    program: 1,
    send_notifcation: false,
    title: "Deafulr",
    text: "Deafult",
    link: ""
    });

  const { callApi: triggerApi} = callApi(() =>
      apiClient.portal.portalPostLinkCreate(link)
    );

   
  const [showForm, setShowForm] = useState(false);
  const [showAddLink, setShowAddLink ] = useState(false);
  const handleShareClick = () => setShowForm((prev) => !prev);


  function getAddLink() {
    return  <Paper withBorder p="md" radius="md" mb="md">
          <Title order={4} mb="xs">Ladda upp fil</Title>
    
          <TextInput
            label="Länk"
            placeholder="Ange länk"
            value={link.link}
            onChange={(e) => setLink("link", e.currentTarget.value)}
            mb="md"
          />
            <Button fullWidth onClick={() => (triggerApi())} color="blue">
            Publicera
            </Button>
          
          </Paper>
  }



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

        <Button variant="outline" color="blue" size="xl" onClick={() => setShowAddLink((prev) => !prev)}>
          Lägg ut länk
        </Button>
      </Group>

      {showAddLink && getAddLink()}

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