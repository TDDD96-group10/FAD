import { Burger, Container, Drawer, Group, Paper, ScrollArea, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useApi } from '../hooks/useApi';
import { apiClient } from '../api/ApiClient';
import { PostSerializer } from '../api/Api';

const SAMPLE_POSTS: PostSerializer[] = [
  {
    id: 1,
    title: 'Update 1',
    text: 'Munchen Hoben pass ändrat',
    created_at: '2025-04-20T10:00:00Z',
    author: { user_id: 'user1', role: 'role', attributes: {} },
    program: { id: 1, name: 'Program 1', attributes: {} },
  },
  {
    id: 2,
    title: 'Update 2',
    text: 'Event canceled due to weather',
    created_at: '2025-04-21T14:30:00Z',
    author: { user_id: 'user2', role: 'admin', attributes: {} },
    program: { id: 2, name: 'Program 2', attributes: {} },
  },
];

const FadderHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [useSampleData, setUseSampleData] = useState<boolean>(false);
  const [opened, setOpened] = useState(false);
  const { data, loading, error } = useApi(() => apiClient.portal.portalPostsList());

  // Memoize processedPosts to avoid unnecessary recalculations
  const processedPosts = useMemo(() => {
    if (useSampleData) {
      return SAMPLE_POSTS;
    }
    if (!data || loading) {
      return [];
    }
    return data; // Data is already PostSerializer[]
  }, [data, loading, useSampleData]);

  // Handle loading and error states
  if (loading && !useSampleData) return <Text color="white">Loading...</Text>;
  if (error && !useSampleData) return <Text color="red">Error: {error.message || 'Failed to fetch posts'}</Text>;

  // Format date and time for display
  const formatDateTime = (dateTime?: string) => {
    if (!dateTime) return '-';
    try {
      return new Date(dateTime).toLocaleString('sv-SE', { dateStyle: 'short', timeStyle: 'short' });
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <Container fluid p="xl" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={0} style={{ flex: 1, overflow: 'hidden' }}>
        <Text size="xl" weight={500} color="white">Senaste Nytt!</Text>
        <ScrollArea style={{ flex: 1 }}>
          <Stack spacing="sm">
            {processedPosts.length === 0 ? (
              <Text color="white">No posts available.</Text>
            ) : (
              processedPosts.map((post, index) => (
                <Paper
                  key={post.id}
                  p="md"
                  withBorder
                  style={{
                    backgroundColor: index % 2 === 0 ? '#333' : '#444',
                    borderRadius: '4px',
                  }}
                >
                  <Stack spacing="xs">
                    <Text size="md" weight={700} color="white">{post.title}</Text>
                    <Text size="sm" color="white">{post.text}</Text>
                    <Group spacing="xs">
                      <Text size="xs" color="dimmed">{post.author.user_id}</Text>
                      <Text size="xs" color="dimmed">{formatDateTime(post.created_at)}</Text>
                    </Group>
                  </Stack>
                </Paper>
              ))
            )}
          </Stack>
        </ScrollArea>
      </Stack>

      <Group
        p="md"
        style={{
          background: '#222',
          borderTop: '1px solid #333',
          position: 'sticky',
          bottom: 0,
          zIndex: 1000,
          justifyContent: 'center',
        }}
      >
        <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" color="white" />
      </Group>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        size="auto"
        padding="md"
        withCloseButton={false}
        styles={{
          drawer: { background: '#222', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' },
        }}
      >
        <Stack spacing="sm">
          <Text
            size="md"
            weight={500}
            color="white"
            style={{ padding: '8px 16px', cursor: 'pointer' }}
            onClick={() => {
              navigate('/FadderDokument');
              setOpened(false);
            }}
          >
            Dokument & Länkar
          </Text>
        </Stack>
      </Drawer>
    </Container>
  );
};

export default FadderHomePage;