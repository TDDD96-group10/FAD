
import {
    Button,
    Container,
    Paper,
    TextInput,
} from '@mantine/core';

import { useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';


const LoginCodePage: React.FC = () => {

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
        <Container size={400} >
            <Paper withBorder shadow="md" p={30}  radius="md">
                <TextInput 
                    label="Kod" 
                    placeholder="" required
                    key={form.key('email')}
                    {...form.getInputProps('email')} 
                />
                 <Button fullWidth  mt="xl"  onClick={handleClick}>
                    Ange kod
                 </Button>    
            </Paper>
        </Container>
    );
};

export default LoginCodePage;