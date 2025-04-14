import {
  Button,
  Container,
  Paper,
  TextInput,
  Text
} from '@mantine/core';
import { useState } from 'react';
import { callApi } from "../hooks/useApi";
import { apiClient } from "../api/ApiClient";
import { MessageResponse } from '../api/Api';


const LoginPage: React.FC = () => {
    const [liuId, setLiuId] = useState('');
    const handleClick = () => {
        localStorage.setItem("liuId", liuId);
        triggerApi();
    }
    const {callApi: triggerApi, error: error} = callApi<MessageResponse>(() =>
        apiClient.auth.authLoginCreate({username: liuId}),
        "/code"
      );
    return (
        <>
        <Container size={400}>
            <Paper withBorder shadow="md" p={30} radius="md">
                <TextInput 
                label="Liu-ID" 
                placeholder="Liu-ID"
                value={liuId}
                onChange={(event) => setLiuId(event.currentTarget.value)}   
                required />
                { error && (
                        <Text c="red" size="sm" mt="sm">
                            {error}
                        </Text>
                        )}
                <Button fullWidth mt="xl" onClick={handleClick}>
                    Logga in
                </Button>
            </Paper>
        </Container>
        </>
    );
};

export default LoginPage;