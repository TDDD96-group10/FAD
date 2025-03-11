
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,} from '@mantine/core';


import '../styles/pages/Login.css'

function Demo() {
    return <Button variant="filled" color="pink" radius="md">Button</Button>;
  }

const Logintest: React.FC = () => {

    return (
        <>
        <Container size={840} my={40}>
        <Title ta="center" className="title">
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="you@mantine.dev" required />
            <PasswordInput label="Password" placeholder="Your password" required mt="md" />
            <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
                Forgot password?
            </Anchor>
            </Group>
            <a href="/home">
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