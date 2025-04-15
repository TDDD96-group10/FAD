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
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState('');

  const handleAdd = () => {
    //Here the logic we be added that makes an request to the database and add the new Activity

    //Handle error messages in title and description fields
    if (title.trim() === '') {
      setTitleError('Måste ange en titel');
    }
    if (description.trim() === '') {
      setDescriptionError('Måste ange en beskrivning');
    }
    else{
      onClose(); 
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setTitle(value);

    if (titleError && value.trim().length > 0) {
      setTitleError(null);
    }
  };

  const hanldeDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setDescription(value)

    if (value.trim().length > 0){
      setDescriptionError('')
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Lägg till event"  >
            <Stack>
              <TextInput label="Titel" placeholder="Titel" onChange={handleTitleChange} error={titleError} withAsterisk />
              <TextInput label="Beskrivning" placeholder="Beskrivning" onChange={hanldeDescriptionChange} error={descriptionError} withAsterisk/>
              <TextInput label="Länk" placeholder="Länk" onChange={(event) => setLink(event.currentTarget.value)}/>
              <Button variant="default" onClick={handleAdd}>Publicera</Button>
            </Stack>
          </Modal>
  );
};

export default AddActivityModal;
