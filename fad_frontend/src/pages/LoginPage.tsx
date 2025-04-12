
import {
  Button,
  Container,
  Paper,
  TextInput,
    } from '@mantine/core';

  import { useNavigate } from "react-router-dom";

const Logintest: React.FC = () => {


    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/code");
    }

    return (
        <>
        <Container size={400}>
            <Paper withBorder shadow="md" p={30} radius="md">
                <TextInput label="Liu-ID" placeholder="Liu-ID"   required />
                <Button fullWidth mt="xl" onClick={handleClick}>
                    Logga in
                </Button>
            </Paper>
        </Container>
        </>
    );
};

export default Logintest;