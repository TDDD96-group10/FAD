import React, { useEffect, useState } from "react";
/*import "../styles/pages/Home.css";*/
import { Card, Text, Badge, Button, Group, ScrollArea , Stack} from '@mantine/core';


const test: React.FC = () => {

  return (
   <div>
     <Group align="top">
      <Stack>
        <h2>Idag</h2>
        <ScrollArea style={{ height: 250 }} type="always" offsetScrollbars scrollbarSize={12}>
       <Card shadow="sm" padding="lg" radius="md"  withBorder w={400} h={200}> 

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

    <Card shadow="sm" padding="lg" radius="md"  withBorder w={400} h={100}> 

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Rubrik</Text>
        <Badge color="pink">Tid</Badge>
      </Group>

    </Card>
    </ScrollArea>
    </Stack>

    <Stack>
            <h2>Imorgon</h2>
            <ScrollArea style={{ height: 250 }} type="always" offsetScrollbars scrollbarSize={12}>
            <Card shadow="sm" padding="lg" radius="md"  withBorder w={400} h={100}> 

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Rubrik</Text>
        <Badge color="pink">Tid</Badge>
      </Group>

    </Card>
    <Card shadow="sm" padding="lg" radius="md"  withBorder w={400} h={100}> 

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Rubrik</Text>
        <Badge color="pink">Tid</Badge>
      </Group>

    </Card>

    </ScrollArea>
          </Stack>
        
        </Group>
   </div>
  );
};

export default test;
