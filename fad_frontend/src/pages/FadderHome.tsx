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

import { useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';
import { useState, useEffect } from 'react';

// import '../styles/pages/FadderHome.css'

// Sample interface for the data structure
interface Task {
    id: number;
    description: string;
    completed: boolean;
}

const FadderHomePage: React.FC = () => {
    const navigate = useNavigate();
    
    // Sample backend data
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, description: "Munchen Hoben pass ändrat", completed: false },
        { id: 2, description: "Schema för campusvandringen finns nu i driven", completed: true },
        { id: 3, description: "Munchen Hoben pass ändrat", completed: false },
        { id: 4, description: "Schema för campusvandringen finns nu i driven", completed: true },
        { id: 5, description: "Munchen Hoben pass ändrat", completed: false },
        { id: 6, description: "Schema för campusvandringen finns nu i driven", completed: true },
        { id: 7, description: "Munchen Hoben pass ändrat", completed: false },
        { id: 8, description: "Schema för campusvandringen finns nu i driven", completed: true },
        { id: 9, description: "Munchen Hoben pass ändrat", completed: false },
        { id: 10, description: "Schema för campusvandringen finns nu i driven", completed: true },
        { id: 11, description: "Munchen Hoben pass ändrat", completed: false },
        { id: 12, description: "Schema för campusvandringen finns nu i driven", completed: true },
        { id: 13, description: "Munchen Hoben pass ändrat", completed: false },
        { id: 14, description: "Schema för campusvandringen finns nu i driven", completed: true },
        { id: 15, description: "Munchen Hoben pass ändrat", completed: false },
        { id: 16, description: "Schema för campusvandringen finns nu i driven", completed: true },
    ]);

    useEffect(() => {
        setTasks(tasks);
    }, []);

    return (
        <ScrollArea style={{ height: '100vh', overflow: 'auto' }} p="md">
            <Stack spacing="lg">
                {/* Three vertically stacked buttons with increased spacing */}
                <Stack 
                    spacing="xl"
                    pt="md"
                    pl="lg"
                    pr="lg"                
                >
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
                <Text 
                    size="xl" 
                    weight={500} 
                    pt="md"  // padding-top
                    pl="md"  // padding-left
                    pr="md"  // padding-right
                >
                    Senaste Nytt!
                </Text>

                {/* Nested ScrollArea with fixed height */}
                <ScrollArea style={{ height: '400px', overflow: 'auto' }} 
                pl="md"
                pr="md"
                pb="md"
                >
                    {/* Bullet list with backend data */}
                    <Stack spacing="xs">
                        {tasks.map((task) => (
                            <Paper
                                key={task.id}
                                p="sm"
                                withBorder
                                style={{
                                    backgroundColor: task.completed ? '#555' : '#333',
                                    borderRadius: '4px',
                                }}
                            >
                                <Text 
                                    component="li"
                                    color="white"
                                    style={{ 
                                        listStylePosition: 'inside'
                                    }}
                                >
                                    {task.description}
                                </Text>
                            </Paper>
                        ))}
                    </Stack>
                </ScrollArea>
            </Stack>
        </ScrollArea>
    );
};

export default FadderHomePage;