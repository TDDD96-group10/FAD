import { useState } from 'react';
import { Paper, Title, TextInput, Button } from '@mantine/core';

const CreateFolderCard = () => {
  const [newFolderName, setNewFolderName] = useState('');

  const handleCreateFolder = () => {
    console.log('Folder created:', newFolderName);
    // You can also clear the input after creation if needed:
    // setNewFolderName('');
  };

  return (
    <Paper withBorder p="md" radius="md" mb="md">
      <Title order={4} mb="xs">Skapa ny mapp</Title>
      <TextInput
        label="Mappnamn"
        placeholder="Ange mappens namn"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.currentTarget.value)}
        mb="md"
      />
      <Button onClick={handleCreateFolder} fullWidth>
        Skapa
      </Button>
    </Paper>
  );
};

export default CreateFolderCard;