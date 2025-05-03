import {
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    ScrollArea,
    Stack,
    TextInput,
    Title,
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
    { id: 1, title: 'Update 1', description: 'Munchen Hoben pass ändratMunchen Hoben pass ändrat', created_at: '2025-04-20T10:00:00Z', author: 'user1' },
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
    const [useSampleData, setUseSampleData] = useState<boolean>(false); // Toggle for sample data
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
        <ScrollArea style={{ height: '100vh', overflow: 'auto' }} p="md">
            <Stack spacing="lg">
                {/* Three vertically stacked buttons with increased spacing */}
                <Stack spacing="xl" pt="md" pl="lg" pr="lg">
                    <Button variant="filled" color="blue" size="lg">
                        Dokument
                    </Button>
                    <Button variant="filled" color="blue" size="lg">
                        Fadderjobb
                    </Button>
                    <Button variant="filled" color="blue" size="lg">
                        Schema
                    </Button>
                </Stack>

                {/* Text component with padding only on top, left, and right */}
                <Text size="xl" weight={500} pt="md" pl="md" pr="md">
                    Senaste Nytt!
                </Text>

                {/* Nested ScrollArea with fixed height */}
                <ScrollArea
                    style={{ height: '400px', overflow: 'auto' }}
                    pl="md"
                    pr="md"
                    pb="md"
                >
                    {/* Bullet list with data */}
                    <Stack spacing="sm">
                        {tasks.map((task, index) => (
                            <Paper
                                key={task.id}
                                p="md"
                                withBorder
                                style={{
                                    backgroundColor: index % 2 === 0 ? '#333' : '#444', // Alternate colors for every otherlist item
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
        </ScrollArea>
    );
};

export default FadderHomePage;