import React, { useState } from 'react';
import {
  Button,
  Container,
  Group,
  Paper,
  TextInput,
  Title,
  MultiSelect,
  Text
} from '@mantine/core';
import { useApi } from "../hooks/useApi";
import { apiClient } from "../api/ApiClient";
import {UserSerializer} from "../api/Api";
import { useSmartState } from "../hooks/useSmartState";

import '../styles/pages/FadderInformation.css';
import { data } from 'react-router-dom';

const FadderInformation: React.FC = () => {

  const { data: user, loading, error, setField, setValue } = useApi(() => apiClient.portal.portalProfileMetaDataList());

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error} </p>;
  


  function getInputType() {
    const input = "ALL";
    const jsonString = JSON.parse(JSON.stringify(user?.program?.attributes));
    return Object.keys(jsonString).map((key) => {
     
      const values = jsonString[key];
      if (Array.isArray(values) && values.includes(input)) {
        return <p>Hello world</p>
      } else if (Array.isArray(values) && !values.includes(input)){
        const attributeFromProgram = jsonString[key] as string[];
        const jsonStringUser = JSON.parse(JSON.stringify(user?.attributes));
        var jsonAtributies = jsonStringUser[key] as string[];

        if(typeof jsonAtributies  !== "object") {
          jsonAtributies = [jsonAtributies]
        }
        return <MultiSelect
            label={key}
            placeholder="Välje ett av alterntiven"
            data={attributeFromProgram}
            value={Array.isArray(jsonAtributies) ? jsonAtributies : []}
            onChange={(selectedValues) => {
              console.log(selectedValues)
              if (user?.attributes) {
                setField("attributes", { ...user?.attributes, [key]: selectedValues })
              }
            }}
            searchable
            clearable
      />
      }
      if (values === "ALL") {
        return <TextInput
          label={key}
          placeholder=""
          value={JSON.parse(JSON.stringify(user?.attributes))[key]}
          onChange={(e) => {
            if (user?.attributes) {
              setField("attributes", { ...user?.attributes, [key]: e.currentTarget.value })
            }
          }}
          required
          mb="md"
        />
      }
    });
  }



  return (
    <Container size={700} my={40}>
      <Title ta="center" mb={20}>
        Fyll i din information
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md">
      <Text fw={500} size="md">
      LIU-ID: {user?.user_id}
    </Text>
        <TextInput
          label="Förnamn"
          placeholder={user?.first_name}
          value={user?.first_name}
          onChange={(e) =>  setField("first_name",e.currentTarget.value)}
          required
          mb="md"
        />
        <TextInput
          label="Efternamn"
          placeholder={user?.last_name}
          value={user?.last_name}
          onChange={(e) =>  setField("last_name",e.currentTarget.value)}
          required
          mb="md"
        />
        <TextInput
          label="Mobilnummer"
          placeholder={user?.phone_number}
          value={user?.phone_number}
          onChange={(e) =>  setField('phone_number', e.currentTarget.value)}
          required
          mb="md"
        />
        <TextInput
          label="Orbi-mail"
          placeholder=""
          value={user?.email ??  ""}
          onChange={(e) =>  setField('email', e.currentTarget.value)}
          required
          mb="md"
        />
        {getInputType()}
     
        <Group justify="center" mt="xl">
          <Button onClick={() => console.log("push")} size="md">
            Spara
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default FadderInformation;