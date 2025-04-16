import { Modal, Stack, TextInput, Button, Checkbox } from '@mantine/core';
import { DateTimePicker, DateValue } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';
import 'dayjs/locale/sv';

type AddActivityModalProps = {
  opened: boolean;
  onClose: () => void;
};

const AddActivityModal = ({ opened, onClose }: AddActivityModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [sendNotification, setSendNotification] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [dateError, setDateError] = useState('');



  const handleAdd = () => {
    //Here the logic we be added that makes an request to the database and add the new Activity

    //Handle error messages in required fields
    if (title.trim() === '') {
      setTitleError('Måste ange en titel');
    }
    else if (description.trim() === '') {
      setDescriptionError('Måste ange en beskrivning');
    }
    else if (date === null) {
      setDateError('Måste ange ett datum');
    }
    else{
      onClose(); 
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setTitle(value);

    if (titleError && value.trim().length > 0) {
      setTitleError('');
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setDescription(value)

    if (value.trim().length > 0){
      setDescriptionError('')
    }
  };

  const handleDateChange = (event: DateValue) => {
    const value = event;
    setDate(value)

    if (value != null){
      setDateError('')
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Lägg till event" centered >
            <Stack>
              <TextInput label="Titel" placeholder="Titel" onChange={handleTitleChange} error={titleError} withAsterisk />
              <TextInput label="Beskrivning" placeholder="Beskrivning" onChange={handleDescriptionChange} error={descriptionError} withAsterisk/>
              <TextInput label="Länk" placeholder="Länk" onChange={(event) => setLink(event.currentTarget.value)}/>
              <DateTimePicker label="Datum och tid" placeholder="Välj datum och starttid" value={date} onChange={handleDateChange} leftSection={<IconCalendar size={18} stroke={1.5} />} error = {dateError} withAsterisk withWeekNumbers locale='sv' clearable />
              <Checkbox defaultChecked label="Skicka notis" color="indigo" checked={sendNotification} onChange={(event) => setSendNotification(event.currentTarget.checked)}/>
              <Button variant="default" onClick={handleAdd}>Publicera</Button>
            </Stack>
          </Modal>
  );
};

export default AddActivityModal;
