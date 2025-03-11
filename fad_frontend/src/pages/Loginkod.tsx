
import {
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    TextInput,
    Title,
} from '@mantine/core';

import { useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';

import '../styles/pages/Login.css'


const Loginkod: React.FC = () => {

    const navigate = useNavigate();

      const handleClick = () => {
          navigate("/home");
      }

      const form = useForm({
            mode: 'uncontrolled',
            validateInputOnChange: true,
            initialValues: { email: ''},
        });

    return (
        <>
        <Container size={840} my={40}>
        <Title ta="center" className="title">
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput 
            label="Kod" 
            placeholder="" required
            key={form.key('email')}
            {...form.getInputProps('email')} 
            />
            <a href="/home">
            <Group justify="space-between" mt="lg">
            </Group>
            <Checkbox label="Remember me" />
            <Button  mt="xl" radius="md" color="gray" onClick={handleClick}>
                Logga in
            </Button>
            </a>
        </Paper>
        </Container>
        </>
    );
};

export default Loginkod;