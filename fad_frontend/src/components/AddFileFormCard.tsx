
import { useState } from 'react';
import {
  Paper,
  Title,
  TextInput,
  FileInput,
  Button
} from '@mantine/core';
import { callApi } from "../hooks/useApi";
import { apiClient } from "../api/ApiClient";



const AddFileFormCard = () => {

  const defaultFile = new File([""], "empty.pdf", { type: "application/pdf" });
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File>(defaultFile);

  const { callApi: triggerApi } = callApi(() =>
        apiClient.portal.portalSharePdfCreate({file_name:fileName, pdf:file})
      );
  



  const handlePublish = () => {
    if (file.name === "empty.pdf" && file.size === 0) {
      return;
    }

    triggerApi();
  };

  return (
    <Paper withBorder p="md" radius="md" mb="md">
      <Title order={4} mb="xs">Ladda upp fil</Title>

      <TextInput
        label="Titel"
        placeholder="Ange titel"
        value={fileName}
        onChange={(e) =>setFileName(e.currentTarget.value)}
        mb="md"
      />

      <FileInput
        label="Fil (PDF)"
        placeholder="Välj en PDF"
        value={file}
        onChange={(value) => {
          if (value !== null) {
            setFile(value);
          }
        }}
        mb="md"
        accept="application/pdf"
      />
      <Button fullWidth onClick={handlePublish} color="blue">
        Publicera
      </Button>
    </Paper>
  );
};

export default AddFileFormCard;