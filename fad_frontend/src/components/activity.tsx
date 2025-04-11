import { Card, Text, Badge, Button, Group} from '@mantine/core';
//import { useState} from 'react';


function Activity1({ title, description, link }: { title: string; description: string; link: string }) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder w={400} h={200}>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Badge color="pink">Tid</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        {link}
      </Button>
  </Card>
  )
}

export default Activity1;



/*const activity: React.FC = () => {

const [title, setTitle2] = useState('');
const [description, setDescription] = useState('');
const [link, setLink] = useState('');

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder w={400} h={200}>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>title</Text>
                <Badge color="pink">Tid</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                description
              </Text>

              <Button color="blue" fullWidth mt="md" radius="md">
                link
              </Button>
        </Card>
    );
};*/