import {
    Button,
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


interface Task {
    id: number;
    title: string;
    description: string;
    created_at: string;
    author: string;
}



const FadderHomePage: React.FC = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [useSampleData, setUseSampleData] = useState<boolean>(false); // Toggle for sample data
    const { data, loading, error } = useApi(() => apiClient.portal.portalPostsList());

 

    if (loading && !useSampleData) {
        return <Text>Loading...</Text>;
    }

    if (error && !useSampleData) {
        return (
            <Text color="red">
                Error: {error || 'Failed to fetch posts'}
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
                        {data?.map((task, index) => (
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
                                        {task.text}
                                    </Text>
                                    <Group spacing="xs" style={{ marginTop: '4px' }}>
                                        <Text size="xs" color="dimmed">
                                            {task.author.first_name}
                                        </Text>
                                        <Text size="xs" color="dimmed">
                                            {formatDateTime(task.created_at ?? "")}
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