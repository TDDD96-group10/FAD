import { Button, Group } from '@mantine/core';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import FADheader from '../components/Header';
import AddActivityModal from '../components/AddActivityModal';
import { useApi } from '../hooks/useApi';
import { apiClient } from '../api/ApiClient';
import PostCard from '../components/PostCard';


const StartPage: React.FC = () => {
  var [opened, { open, close }] = useDisclosure();
  const { data, loading, error } = useApi(() => apiClient.portal.portalPostsList());
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error} {JSON.stringify(data, null, 2)}</p>;


  console.log(data)
  return (
    <FADheader>   
      <AddActivityModal opened={opened} onClose={close}  />
      <Button variant="default" onClick={open}>Lägg till Aktivitet</Button>
      <Group justify="center" align="top" >
        {data?.map((value) => (
          <PostCard post={value} />
        ))}
      </Group>
    </FADheader> 
  );
};

export default StartPage;
