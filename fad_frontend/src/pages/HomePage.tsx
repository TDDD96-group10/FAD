import {
  Container,
  Title,
  TextInput,
  Group,
  Button,
  Text,
  Divider,
  Box,
  Stack
} from '@mantine/core';
import { useState } from 'react';
import { useApi,callApi } from "../hooks/useApi";
import { apiClient } from "../api/ApiClient";
import {User} from "../api/Api";
import { useSmartState } from "../hooks/useSmartState";
import {FADheader } from "../components/header"


const HomePage: React.FC = () => {
  const { data, loading, error } = useApi(() => apiClient.portal.portalHelloWorldList());
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [user, setUser] = useSmartState<User>({
    id: 1,
    username: '',
    email: ''
  });

  const { callApi: triggerApi} = callApi(() =>
    apiClient.portal.portalHelloWorldCreate({ user: user })
  );
  const handleSubmit = () => {
    if (name.trim()) {
      setSubmittedName(name);
    }
  };

  const handleAPISubmit = () => {
    triggerApi();
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error} {JSON.stringify(data, null, 2)}</p>;

  return (
  

    <FADheader>
    <Container size="xs" >
    <Title order={2} mb="lg">
      Mantine + React TypeScript Demo  {JSON.stringify(data, null, 2)}
    </Title>
  
    {/* --- Section 1: Normal State --- */}
    <Box>
      <Title order={4} mb="sm">Basic Form</Title>
      <Stack>
        <TextInput
          label="Your name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
  
        <Group mt="md">
          <Button onClick={handleSubmit}>Submit</Button>
        </Group>
  
        {submittedName && (
          <Text mt="md" size="lg">
            Hello, <strong>{submittedName}</strong>
          </Text>
        )}
      </Stack>
    </Box>
  
    <Divider my="xl" label="or" labelPosition="center" />
  
    {/* --- Section 2: API Call with Custom Hook --- */}
    <Box>
      <Title order={4} mb="sm">API-Connected Form</Title>
      <Stack>
        <TextInput
          label="Your username"
          placeholder="Enter your username"
          value={user.username}
          onChange={(e) => setUser("username", e.currentTarget.value)}
        />
  
        <TextInput
          label="Your email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser("email", e.currentTarget.value)}
        />
  
        <Group mt="md">
          <Button onClick={handleAPISubmit}>Submit API</Button>
        </Group>
      </Stack>
    </Box>
  </Container>
 
  </FADheader>
  );
};

export default HomePage;
