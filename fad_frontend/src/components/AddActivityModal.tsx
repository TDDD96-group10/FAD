import { Modal, Stack, TextInput, Button } from '@mantine/core';
import { useState } from 'react';

type AddActivityModalProps = {
  opened: boolean;
  onClose: () => void;
};

const AddActivityModal = ({ opened, onClose }: AddActivityModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const handleAdd = () => {
    //Here the logic we be added that makes an request to the database and add the new Activity
    onClose(); 
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Lägg till event"  >
            <Stack>
              <TextInput label="Titel" placeholder="Titel" onChange={(event) => setTitle(event.currentTarget.value)}/>
              <TextInput label="Beskrivning" placeholder="Beskrivning" onChange={(event) => setDescription(event.currentTarget.value)}/>
              <TextInput label="Länk" placeholder="Länk" onChange={(event) => setLink(event.currentTarget.value)}/>
              <Button variant="default" onClick={handleAdd}>Publicera</Button>
            </Stack>
          </Modal>
  );
};

export default AddActivityModal;
