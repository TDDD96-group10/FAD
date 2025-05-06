import { Button, Card, Group, Modal, Paper, Stack, Title, useModalsStack, Badge, TextInput,Text } from "@mantine/core";
import { useState } from "react";
import { IconSettings} from '@tabler/icons-react';
import { callApi, useApi } from "../hooks/useApi";
import { apiClient } from "../api/ApiClient";
import { useSmartState } from "../hooks/useSmartState";
import {AddAtributeText, AddCustomFileds} from "../api/Api";

import FADheader from "../components/header";

import AddTagModal from "../components/TagsModal";
import ProfileModals from "../components/ProfileModals";
import TagsModal from "../components/TagsModal";


type tagProps = {
  name: string;
  color: string;
}


type profileProps =  {
  title: string;
  description: string | null;
  addedOptions?: string[];
  showTags: boolean;
  mandatory: boolean;
}

const Configure: React.FC = () => {
  const { data, loading, error } = useApi(() => apiClient.portal.portalFadderTagsList());

  const [freeText, setFreeText] = useState<AddAtributeText>({key_name:""});
  const [freeTextCustom, setFreeTextCustom] = useState<AddAtributeText>({key_name:""});
  const [customTags, setcustomTag, setValue] = useSmartState<AddCustomFileds>({key_name :"", Key_value: []})

  const { callApi: triggerApi} = callApi(() =>
      apiClient.portal.portalFadderTagsCreate(freeText)
    );
  const { callApi: addCustomFiledText} = callApi(() =>
      apiClient.portal.portalAddAtributeCreate(freeTextCustom)
  );
  const { callApi: addCustomMultiSelect} = callApi(() =>
    apiClient.portal.portalAddMutivalueFiledsCreate(customTags)
  );

  const { callApi: deleteFadderTag} = callApi(() =>
    apiClient.portal.portalFadderTagsDelete(freeText)
  );



  const stack = useModalsStack(['create-tag','edit-tag','delete-tag','create-profile-field', 'edit-profile-field', 'delete-profile-field', 'view-tags', "delete-free-text","view-tags-multi", "fadder-atribute"]);

  //States related to new profile option.
  const [selcetedProfile, setSelectedProfile] = useState<profileProps | null>(null);
  

  function saveNewProfileField(newProfile: profileProps) {
      if (newProfile.showTags) {
        setcustomTag("key_name",newProfile.title);
        setcustomTag("Key_value", newProfile.addedOptions ?? []);
        addCustomMultiSelect();
      
      } else {
        setFreeTextCustom({key_name:newProfile.title})
        addCustomFiledText();
      }
      stack.closeAll();
      window.location.reload();
      
  }

  function addTag(data: tagProps){
    console.log("We are addnig tag")
    console.log(data)
    setFreeText({key_name:data.name});
    console.log("We are addnig tag")
    triggerApi()
    stack.closeAll();
  }

  function changeWindow(changeModalWindow: string){
    stack.open(changeModalWindow as 'create-tag' | 'edit-tag' | 'delete-tag' | 'create-profile-field' | 'edit-profile-field' | 'delete-profile-field' | "view-tags" |"delete-free-text" | "view-tags-multi" | "fadder-atribute")
  }

  function selectTag(index: number){
    stack.open('fadder-atribute');
    const current_value = {key_name: data?.fadder_tags[index] ?? ""}
    setFreeText(current_value)
  }

  function selectFreeText(index: number){
    stack.open('delete-free-text');
    const current_value = {key_name: data?.custom_free_text[index] ?? ""}
    setFreeTextCustom(current_value)
  }

  function selectMultiValueTags(key: string) {
    stack.open("view-tags-multi")
    const current_value = data?.tag_groups[key]
    setcustomTag("key_name",key);
    setcustomTag("Key_value", current_value ?? []);

  }


  function removeProfile(){
    
    stack.closeAll();
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error} {JSON.stringify(data, null, 2)}</p>;

  console.log(data)

  return (
    <FADheader>
        <Stack>
          <Card>
          <Title order={1}>Konfiguration</Title>
          <Title order={4}>
            Under denna sidan kan du konfigurera vilka taggar som ska användas i Overview-sidan och om ni vill ha ytterligare
            informatiom om faddrarna.
          </Title>
          </Card>
          <Stack component={Paper}>
            <Card>
              <Title order={2}>Taggar</Title>
              <Title order={4}>
                Taggar används för att sortera faddrarna på overview-sidan, exempel på taggar kan vara: klassfadder, nykterfadder, häfvfadder osv.
              </Title>
              <Button onClick={() => stack.open('create-tag')}>Lägg till tagg</Button>
              <Group pt = {10} >
              {data?.fadder_tags.map((item, index) => (
                  <Button key={index} onClick={() => selectTag(index)} color={'#2e2e2e'} defaultValue={item} rightSection={<IconSettings size= {14}/>} > {item} </Button>
              ))}
              </Group>
              </Card>
              <Card>
              <Title order={2}>Profilsidan</Title>
              <Title order={4}>Om ni saknar information kan ni skapa en ny rubrik här, där ni kan välja att de kan skriva i fritext, eller faddrarna ska få olika alternativ att välja mellan.</Title>
              <Button onClick={() => stack.open('create-profile-field')}>Lägg till profilinformation</Button>
              <Group pt = {10}>
                {data?.custom_free_text.map((value, index) =>(
                <Button onClick = {() => selectFreeText(index)} key={index}> {value}</Button>))}
                {Object.keys(data?.tag_groups ?? []).map((value, index) =>(
                <Button onClick = {() => selectMultiValueTags(value)} key={index}> {value}</Button>))}
              </Group>
              </Card>
            <Modal.Stack>
              <Modal size="sm" title="Skapa tagg" {...stack.register('create-tag')}>
                <Stack >
                        <TextInput value={freeText.key_name}  
                          error= {error ? 'Får inte ha samma namn som annan tag' : ''} 
                          onChange={(event) => setFreeText({key_name:event.currentTarget.value})}/>
                        <Button 
                          maw={320} 
                          onClick={() => {triggerApi(); stack.closeAll();window.location.reload();}}
                          >Spara</Button>
                      </Stack>
              </Modal>
            
              <Modal {...stack.register('delete-free-text')} title="Confirm action" size="sm">
                <Text>{freeTextCustom.key_name}</Text>
                <Button color="red" onClick={() => deleteFadderTag()}>Radera</Button>
              </Modal>
              <Modal {...stack.register('fadder-atribute')} title="Confirm action" size="sm">
                <Text>{freeText.key_name}</Text>
                <Button color="red" onClick={() => deleteFadderTag()}>Radera</Button>
              </Modal>
              <Modal {...stack.register('create-profile-field')} title="Profilinformation" size="sm">
                  <ProfileModals 
                              saveNewProfile={saveNewProfileField} 
                              deleteProfileField={removeProfile}
                              changeWindow={changeWindow}
                              exit ={() => stack.closeAll} 
                              currentCase='create-profile-field'
                              selectedProfile= {selcetedProfile!}/>
                </Modal>
              
               
                <Modal {...stack.register('view-tags-multi')}>
                  <Stack>
                  <Text>{customTags.key_name}</Text>
                  <Group>
                    {customTags.Key_value.map((word) => (
                      <Badge key={word} variant="light" rightSection="×" style={{ cursor: 'pointer' }}>
                        {word}
                      </Badge>
                    ))}
                    </Group>
                  </Stack>
                  <Button color="red" onClick={() => deleteFadderTag()}>Radera</Button>
                </Modal>
                
              </Modal.Stack>
          </Stack>
        </Stack>
    </FADheader>

  );
}

export default Configure;


