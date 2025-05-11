import { Button, Group,  Stack, Title, Card, Text, Center } from '@mantine/core';
import React from 'react';
import FADheader from '../components/Header';
import { useApi } from '../hooks/useApi';
import { apiClient } from '../api/ApiClient';
import { useParams } from 'react-router-dom';


const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useApi(() => apiClient.portal.portalPostRead(id ?? "None"));
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error} {JSON.stringify(data, null, 2)}</p>;

  const formatDateTime = (dateTime: string) => {
    if (dateTime === '-' || dateTime === 'Unknown') return '-';
    try {
        const date = new Date(dateTime);
        return date.toLocaleString('sv-SE', {
            dateStyle: 'short',
            timeStyle: 'short',
        });
    } catch {
        return 'Invalid Date';
    }
};


  return (
    <FADheader>   

        <Stack>
            {data?.can_delete && <Button color="red">Radera Inlägg</Button>}
    
      
         <Card shadow="sm" padding="lg" radius="md" withBorder >
                <Group justify="space-between" mt="md" mb="xs">
                <Center >
                    <Title>{data?.title}</Title>
                </Center>
               
                </Group>
                <Text size="sm" c="dimmed">
                  {data?.text}
                </Text>

                <Group mt="sm" mb="sm">
                    <Text size="sm" c="dimmed">
                        Författare: {data?.author.user_id}
                    </Text>

                    <Text size="sm" c="dimmed">
                        Publicerad: {formatDateTime(data?.created_at ?? "")}
                    </Text>
                </Group>
              </Card>
              </Stack>
    </FADheader> 
  );
};

export default PostPage;
