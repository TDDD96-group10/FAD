import { Card, Text, Badge, Button, Group, ScrollArea, Stack, Modal, TextInput } from '@mantine/core';
import { useState } from 'react';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import Activity1 from '../components/activity';
import FADheader from '../components/header';

const StartPage: React.FC = () => {

  //Modal
  var [opened, { open, close }] = useDisclosure();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  //Activities
  const [activityList, setActivityList] = useState<React.ReactNode[]>([]);
  const handleAddActivity = () => {
    setActivityList((prev) => [...prev, <Activity1 title={title} description={description} link={link} />]);
    //Close modal
    close();
  };

  return (
    
    <>    
      <Modal opened={opened} onClose={close} title="Lägg till event" centered >
        <Stack>
          <TextInput label="Titel" placeholder="Titel" onChange={(event) => setTitle(event.currentTarget.value)}/>
          <TextInput label="Beskrivning" placeholder="Beskrivning" onChange={(event) => setDescription(event.currentTarget.value)}/>
          <TextInput label="Länk" placeholder="Länk" onChange={(event) => setLink(event.currentTarget.value)}/>
          <Button variant="default" onClick={handleAddActivity}>Publicera</Button>
        </Stack>
      </Modal>
      <div>
        <Button variant="default" onClick={open}>Open modal</Button>
      </div>
      
      <Group justify="center" align="top" >
        <Stack>
          <h2>Idag</h2>
                    
          <ScrollArea style={{ height: 250 }} type="always" offsetScrollbars scrollbarSize={12} scrollbars="y">
          {activityList.map((component, index) => (
              <div key={index}>
                {component}
              </div>
            ))}

            {/*<Card shadow="sm" padding="lg" radius="md" withBorder w={400} h={200}>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Rubrik</Text>
                <Badge color="pink">Tid</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                Beskrivning
              </Text>

              <Button color="blue" fullWidth mt="md" radius="md">
                Länk
              </Button>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder w={400} h={100}>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Rubrik</Text>
                <Badge color="pink">Tid</Badge>
              </Group>

            </Card>
            */}
          </ScrollArea>
        </Stack>

        <Stack>
          <h2>Imorgon</h2>
          <ScrollArea style={{ height: 250 }} type="always" offsetScrollbars scrollbarSize={12} scrollbars="y">
            <Card shadow="sm" padding="lg" radius="md" withBorder w={400} h={100}>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Rubrik</Text>
                <Badge color="pink">Tid</Badge>
              </Group>

            </Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder w={400} h={100}>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Rubrik</Text>
                <Badge color="pink">Tid</Badge>
              </Group>

            </Card>

          </ScrollArea>
        </Stack>

      </Group>
    </>
    
  );
};

export default StartPage;
