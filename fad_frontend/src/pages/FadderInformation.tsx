import React, { useState } from 'react';
import {
  Button,
  Container,
  Group,
  Paper,
  TextInput,
  Title,
  Select,
  MultiSelect
} from '@mantine/core';

import '../styles/pages/FadderInformation.css';

const FadderInformation: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    shirtSize: '',
    specialDiet: [] as string[],
    otherDiet: '',
  });

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Fyll i alla obligatoriska fält.');
      return;
    }

    const finalDiet = formData.specialDiet.includes('Annat...')
    ? [...formData.specialDiet.filter((d) => d !== 'Annat...'), formData.otherDiet]
    : formData.specialDiet;

    console.log('Skickat:', {
        ...formData,
        specialDiet: finalDiet,
    });


    console.log('Skickat:', formData);
    alert('Tack! Informationen har sparats.');
  };

  return (
    <Container size={700} my={40}>
      <Title ta="center" mb={20}>
        Fyll i din information
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        <TextInput
          label="Förnamn"
          placeholder="Anna"
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.currentTarget.value)}
          required
          mb="md"
        />
        <TextInput
          label="Efternamn"
          placeholder="Andersson"
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.currentTarget.value)}
          required
          mb="md"
        />
        <TextInput
          label="Mobilnummer"
          placeholder="070-123 45 67"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.currentTarget.value)}
          required
          mb="md"
        />
        <TextInput
          label="Orbi-mail"
          placeholder="du@orbi.nu"
          value={formData.email}
          onChange={(e) => handleChange('email', e.currentTarget.value)}
          required
          mb="md"
        />
        <Select
          label="Tröjstorlek"
          placeholder="Välj din storlek"
          data={['XS', 'S', 'M', 'L', 'XL', 'XXL']}
          value={formData.shirtSize}
          onChange={(value) => handleChange('shirtSize', value || '')}
          required
          mb="md"
        />
       <MultiSelect
        label="Specialkost / Allergier"
        placeholder="Välj en eller flera"
        description='Välj "Annat..." om din specialkost inte finns i listan'
        data={[
            'Laktosfri',
            'Glutenfri',
            'Vegetarian',
            'Vegan',
            'Nötallergi',
            'Annat...'
        ]}
        
        value={formData.specialDiet}
        onChange={(value) => handleChange('specialDiet', value)}
        mb={formData.specialDiet.includes('Annat...') ? 0 : 'md'}
        />

        {formData.specialDiet.includes('Annat...') && (
        <TextInput
            placeholder="Skriv in din specialkost här..."
            value={formData.otherDiet}
            onChange={(e) => handleChange('otherDiet', e.currentTarget.value)}
            mb="md"
            autoFocus
            variant="filled"
            styles={{
            input: {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
            },
            }}
        />
        )}


        <Group justify="center" mt="xl">
          <Button onClick={handleSubmit} size="md">
            Spara
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default FadderInformation;