
import { useState } from 'react';
import {
  Paper,
  Title,
  TextInput,
  FileInput,
  Button,
  Select,
} from '@mantine/core';

const AddFileFormCard = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showFolderForm, setShowFolderForm] = useState(false);

  const folders = ['Dokument', 'Rapporter', 'Avtal']; // example folder names

  const handlePublish = () => {
    if (!file || !title || !selectedFolder) {
      alert('Vänligen fyll i alla fält');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('folder', selectedFolder);

    // here will the logic be for that sending the request for upploading a new file in to the backend
  };

  return (
    <Paper withBorder p="md" radius="md" mb="md">
      <Title order={4} mb="xs">Ladda upp fil</Title>

      <TextInput
        label="Titel"
        placeholder="Ange titel"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        mb="md"
      />

      <FileInput
        label="Fil (PDF)"
        placeholder="Välj en PDF"
        value={file}
        onChange={setFile}
        mb="md"
        accept="application/pdf"
      />

      <Select
        label="Mapp"
        placeholder="Välj en mapp"
        data={[...folders, '➕ Skapa ny mapp...']}
        value={selectedFolder}
        onChange={(value) => {
          if (value === '➕ Skapa ny mapp...') {
            setShowFolderForm(true); // open folder creation form
          } else {
            setSelectedFolder(value);
          }
        }}
        mb="md"
      />

      <Button fullWidth onClick={handlePublish} color="blue">
        Publicera
      </Button>
    </Paper>
  );
};

export default AddFileFormCard;