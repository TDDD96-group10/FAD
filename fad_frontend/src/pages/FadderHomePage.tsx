import {
    Burger,
    Container,
    Drawer,
    Group,
    Paper,
    ScrollArea,
    Stack,
    Text,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { apiClient } from '../api/ApiClient';
import { PostSerializer } from '../api/Api';

interface Task {
    id: number;
    title: string;
    description: string;
    created_at: string;
    author: string;
}

// Sample data for testing
const SAMPLE_TASKS: Task[] = [
    { id: 1, title: 'Update 1', description: 'Munchen Hoben pass ändrat', created_at: '2025-04-20T10:00:00Z', author: 'user1' },
    { id: 2, title: 'Schedule Update', description: 'Schema för campusvandringen finns nu i driven', created_at: '2025-04-20T12:00:00Z', author: 'user2' },
    { id: 3, title: 'Update 2', description: 'Munchen Hoben pass ändrat', created_at: '2025-04-20T14:00:00Z', author: 'user1' },
    { id: 4, title: 'Schedule Update', description: 'Schema för campusvandringen finns nu i driven', created_at: '2025-04-20T16:00:00Z', author: 'user2' },
    { id: 5, title: 'Update 3', description: 'Munchen Hoben pass ändrat', created_at: '2025-04-20T18:00:00Z', author: 'user1' },
    { id: 6, title: 'Schedule Update', description: 'Schema för campusvandringen finns nu i driven', created_at: '2025-04-20T20:00:00Z', author: 'user2' },
    { id: 7, title: 'Update 4', description: 'Munchen Hoben pass ändrat', created_at: '2025-04-21T08:00:00Z', author: 'user1' },
    { id: 8, title: 'Schedule Update', description: 'Schema för campusvandringen finns nu i driven', created_at: '2025-04-21T10:00:00Z', author: 'user2' },
    { id: 9, title: 'Update 5', description: 'Munchen Hoben pass ändrat', created_at: '2025-04-21T08:00:00Z', author: 'user1' },
    { id: 10, title: 'Schedule Update', description: 'Schema för campusvandringen finns nu i driven', created_at: '2025-04-21T14:00:00Z', author: 'user2' },
    { id: 11, title: 'Update 6', description: 'Munchen Hoben pass ändrat', created_at: '2025-04-21T16:00:00Z', author: 'user1' },
    { id: 12, title: 'Schedule Update', description: 'Schema för campusvandringen finns nu i driven', created_at: '2025-04-21T18:00:00Z', author: 'user2' },
    { id: 13, title: 'Update 7', description: 'Munchen Hoben pass ändrat', created_at: '2025-04-21T20:00:00Z', author: 'user1' },
    { id: 14, title: 'Schedule Update', description: 'Schema för campusvandringen finns nu i driven', created_at: '2025-04-22T08:00:00Z', author: 'user2' },
    { id: 15, title: 'Update 8', description: 'Munchen Hoben pass ändrat', created_at: '2025-04-22T10:00:00Z', author: 'user1' },
    { id: 16, title: 'Schedule Update', description: 'Schema för campusvandringen finns nu i driven', created_at: '2025-04-22T12:00:00Z', author: 'user2' },
];

const FadderHomePage: React.FC = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [useSampleData, setUseSampleData] = useState<boolean>(false);
    const [opened, setOpened] = useState(false);
    const { data, loading, error } = useApi(() => apiClient.portal.portalPostsList());

    useEffect(() => {
        if (useSampleData) {
            setTasks(SAMPLE_TASKS);
        } else if (data && !loading) {
            const fetchedTasks: Task[] = data.map((post: PostSerializer) => ({
                id: post.id || -1,
                title: post.title,
                description: post.text,
                created_at: post.created_at || '-',
                author: post.author.user_id || '-',
            }));
            setTasks(fetchedTasks);
        }
    }, [data, loading, useSampleData]);

    if (loading && !useSampleData) {
        return <Text>Loading...</Text>;
    }

    if (error && !useSampleData) {
        return (
            <Text color="red">
                Error: {error.message || 'Failed to fetch posts'}
            </Text>
        );
    }

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
        <Container
            fluid
            p="xl"
            pt="xl"
            style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
        >
            <Stack spacing={0} style={{ flex: 1, overflow: 'hidden' }}>
                <Text size="xl" weight={500}>
                    Senaste Nytt!
                </Text>
                <ScrollArea style={{ flex: 1, overflow: 'auto' }}>
                    <Stack spacing="sm">
                        {tasks.map((task, index) => (
                            <Paper
                                key={task.id}
                                p="md"
                                withBorder
                                style={{
                                    backgroundColor: index % 2 === 0 ? '#333' : '#444',
                                    borderRadius: '4px',
                                    minHeight: '80px',
                                }}
                            >
                                <Stack spacing="xs">
                                    <Text
                                        size="md"
                                        weight={700}
                                        color="white"
                                        style={{ listStyle: 'none' }}
                                    >
                                        {task.title}
                                    </Text>
                                    <Text
                                        size="sm"
                                        color="white"
                                        style={{ listStyle: 'none' }}
                                    >
                                        {task.description}
                                    </Text>
                                    <Group spacing="xs" style={{ marginTop: '4px' }}>
                                        <Text size="xs" color="dimmed">
                                            {task.author}
                                        </Text>
                                        <Text size="xs" color="dimmed">
                                            {formatDateTime(task.created_at)}
                                        </Text>
                                    </Group>
                                </Stack>
                            </Paper>
                        ))}
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color="white"
                    style={{ zIndex: 1001 }}
                />
            </Group>

            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                position="bottom"
                size="auto"
                padding="md"
                withCloseButton={false}
                styles={{
                    drawer: {
                        background: '#222',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                        zIndex: 999,
                    },
                }}
            >
                <Stack spacing="sm">
                    <Text
                        size="md"
                        weight={500}
                        color="white"
                        style={{ padding: '8px 16px', cursor: 'pointer' }}
                        onClick={() => {
                            navigate('/fadderdocuments');
                            setOpened(false);
                        }}
                    >
                        Dokument
                    </Text>
                    <Text
                        size="md"
                        weight={500}
                        color="white"
                        style={{ padding: '8px 16px', cursor: 'pointer' }}
                        onClick={() => {
                            navigate('/fadderlinks');
                            setOpened(false);
                        }}
                    >
                        Länkar
                    </Text>
                </Stack>
            </Drawer>
        </Container>
    );
};

export default FadderHomePage;