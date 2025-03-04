
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
          navigate("/home");
      }
  
      const form = useForm({
          mode: 'uncontrolled',
          validateInputOnChange: true,
          initialValues: { email: ''},
  
          
      
          // functions will be used to validate values at corresponding key
          
        });
  
      return (    
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
              <Button  mt="xl" radius="md" color="gray" onClick={handleClick}>
              Logga in
              </Button>
          </Paper>
          </Container>
      );
  }
  
  
  const Loginkod: React.FC = () => {
  
      return (
          <div className="container">
              <main className="content">
  
                  <AuthenticationTitle />
              </main>
  
          </div>
      );
  };
  
  export default Loginkod;