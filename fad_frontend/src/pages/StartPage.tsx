import { Button, Group, ScrollArea, Stack, Title,Box  } from '@mantine/core';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ActivityCard, initialActivityGroups}  from '../components/activity';
import FADheader from '../components/header';
import AddActivityModal from '../components/AddActivityModal';

const StartPage: React.FC = () => {
  var [opened, { open, close }] = useDisclosure();

  return (
    <FADheader>   
      <AddActivityModal opened={opened} onClose={close}  />
      <Button variant="default" onClick={open}>Lägg till Aktivitet</Button>
      
      <Group justify="center" align="top" >
      <ScrollArea type="always" offsetScrollbars scrollbarSize={12} scrollbars="x">
        <Box style={{ display: 'flex', gap: '24px', padding: '1rem' }}>
          {initialActivityGroups.map((group, index) => (
            <Stack key={index} >
              <Title order={2}>{group.label}</Title>
              <ScrollArea type="always" offsetScrollbars scrollbarSize={12} scrollbars="y" >
                <Stack gap="md">
                  {group.activities.map((component, index) => (
                    <ActivityCard
                      key={index}
                      title={component.title}
                      link={component.link}
                      description={component.description}
                    />
                  ))}
                </Stack>
              </ScrollArea>
            </Stack>
          ))}   
        </Box>
      </ScrollArea>
      </Group>
    </FADheader> 
  );
};

export default StartPage;
