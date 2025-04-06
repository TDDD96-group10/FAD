
import {
  Button,
  Container,
  Group,
  Paper,
  TextInput,
  Title,} from '@mantine/core';


import '../styles/pages/Login.css'


const Logintest: React.FC = () => {

    return (
        <>
        <Container size={840} my={40}>
        <Title ta="center" className="title">
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="you@mantine.dev"   defaultValue="test@example.com" required />
            <Group justify="space-between" mt="lg">
            </Group>
            <a href="/code">
                <Button fullWidth mt="xl" onClick={() => console.log('Login clicked')}>
                Sign in
                </Button>
            </a>
        </Paper>
        </Container>
        </>
    );
};

export default Logintest;