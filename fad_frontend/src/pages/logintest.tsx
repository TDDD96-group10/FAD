
/*import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';

import '../styles/pages/Login.css'

function Demo() {
    return <Button variant="filled" color="pink" radius="md">Button</Button>;
  }

function AuthenticationTitle() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login");
    }

    const form = useForm({
        mode: 'uncontrolled',
        validateInputOnChange: true,
        initialValues: { email: ''},
        
        
        
        // functions will be used to validate values at corresponding key
        validate: {
            // Check for Liu-mail format
          email: (value) => (/^[A-Za-z_-]{5}[0-9_-]{3}@student.liu.se$/.test(value) ? null : 'Invalid email'),
        },
      });




    return (    
        <Container size={840} my={40}>
        <Title ta="center" className="title">
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput 
            label="Användarnamn/Liu-mail" 
            placeholder="abcde123@student.liu.se" required
            key={form.key('email')}
            {...form.getInputProps('email')} 
            />
            
            {form.isValid() ? 
                <Button mt="xl" radius="md" color="gray" onClick={handleClick}>
                Skicka mail
                </Button>
            :
                <Button disabled mt="xl" radius="md" color="gray" onClick={handleClick}>
                Skicka mail
                </Button>    
            }

        </Paper>
        </Container>
    );
}


const Logintest: React.FC = () => {

    return (
        <div className="container">
            <main className="content">

                <AuthenticationTitle />
            </main>

        </div>
    );
};

export default Logintest;*/