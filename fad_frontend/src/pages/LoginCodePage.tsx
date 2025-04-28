import {
    Button,
    Container,
    Paper,
    TextInput,
    Text 
} from '@mantine/core';
import { callApi } from "../hooks/useApi";
import { apiClient } from "../api/ApiClient";
import { CodeSubmit, TokenResponse } from '../api/Api';
import { useSmartState } from '../hooks/useSmartState';


const LoginCodePage: React.FC = () => {
    const liuId = localStorage.getItem("liuId") ?? "";
    const [form, setFormField] = useSmartState<CodeSubmit>({ username: liuId , code: '' });

    const handleResponse = (tokens: TokenResponse) => {
        localStorage.setItem("access", tokens.access);
        localStorage.setItem("refresh", tokens.refresh);
      };

    const {callApi:triggerApi, error:error} = callApi<TokenResponse>(() =>
        apiClient.auth.authCodeCreate(form),
        "/",
        handleResponse
      );

    return (
        <Container size={400} >
            <Paper withBorder shadow="md" p={30}  radius="md">
                <TextInput 
                    label="Kod" 
                    placeholder="" 
                    required
                    value={form.code}
                    onChange={(e) => setFormField('code', e.currentTarget.value)}
                />
                {error && (<Text c="red" size="sm" mt="sm">{error}</Text>)}
                 <Button fullWidth  mt="xl"  onClick={triggerApi}>
                    Ange kod
                 </Button>    
            </Paper>
        </Container>
    );
};

export default LoginCodePage;