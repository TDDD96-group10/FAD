import { Button, Card, Group, Modal, Paper, Stack, Title, useModalsStack } from "@mantine/core";

import { useState } from "react";
import { IconSettings} from '@tabler/icons-react';

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
  
  const stack = useModalsStack(['create-tag','edit-tag','delete-tag','create-profile-field', 'edit-profile-field', 'delete-profile-field']);
  const [tags, setTags] = useState<tagProps[]>([]);
  const [selectedTag, setSelectedTag] = useState<tagProps | null>(null);

  //States related to new profile option.
  const [selcetedProfile, setSelectedProfile] = useState<profileProps | null>(null);
  const [profileFields, setProfileFileds] = useState<profileProps[]>([]);

  function saveNewProfileField(newProfile: profileProps) {
      stack.closeAll();
      setProfileFileds(prev => [...prev, newProfile]);
  }

  function addTag(newTag: tagProps){
    setTags([...tags, newTag]);
    stack.closeAll();
  }

  function changeWindow(changeModalWindow: string){
    stack.open(changeModalWindow as 'create-tag' | 'edit-tag' | 'delete-tag' | 'create-profile-field' | 'edit-profile-field' | 'delete-profile-field')
  }

  function selectTag(index: number){
    stack.open('edit-tag');
    const currentlySelectedTag = tags[index]
    setSelectedTag(currentlySelectedTag);
    
  }
  function selectProfile(index: number){
    stack.open('edit-profile-field');
    const newSelectedProfile = profileFields[index];
    setSelectedProfile(newSelectedProfile);
  }

  function editTag(changedTag: tagProps) {
    const index = tags.findIndex(tag =>
      tag.name === selectedTag?.name && tag.color === selectedTag?.color);
    if (index === -1) return;
  
    const updatedTags = [...tags];
    updatedTags[index] = changedTag;
  
    setTags(updatedTags);
    stack.closeAll();
  }

  function removeTag() {
    const selectedTagIndex = tags.findIndex(tag => tag.name === selectedTag?.name);
    if (selectedTagIndex !== -1) {
      setTags(prevTags => prevTags.filter((_, i) => i !== selectedTagIndex));
      stack.closeAll();
    }
  }
  function removeProfile(){
    setProfileFileds(prev => prev.filter(profile => profile.title !== selcetedProfile?.title));
    stack.closeAll();
  }


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
              {tags.map((item, index) => (
                  <Button key={index} onClick={() => selectTag(index)} color={item.color} defaultValue={item.name} rightSection={<IconSettings size= {14}/>} > {item.name} </Button>
              ))}
              </Group>
              </Card>
              <Card>
              <Title order={2}>Profilsidan</Title>
              <Title order={4}>Om ni saknar information kan ni skapa en ny rubrik här, där ni kan välja att de kan skriva i fritext, eller faddrarna ska få olika alternativ att välja mellan.</Title>
              <Button onClick={() => stack.open('create-profile-field')}>Lägg till profilinformation</Button>
              <Group pt = {10}>
                {profileFields.map((value, index) =>(
                <Button onClick = {() => selectProfile(index)} key={index}> {value.title}</Button>))}
              </Group>
              </Card>
            <Modal.Stack>
              <Modal size="sm" title="Skapa tagg" {...stack.register('create-tag')}>
                <TagsModal  tags={tags} 
                              addTag={addTag} 
                              editTag={editTag} 
                              removeTag={removeTag} 
                              exitWindow={() => stack.closeAll()} 
                              changeWindow={changeWindow} 
                              currentCase="create-tag"/>
              </Modal>
              <Modal {...stack.register('edit-tag')}>
                  <TagsModal 
                              removeTag={removeTag} 
                              tags = {tags} 
                              editTag={editTag} 
                              changeWindow={changeWindow} 
                              prevName={selectedTag?.name} 
                              exitWindow={() => stack.closeAll()} 
                              prevColor={selectedTag?.color} 
                              currentCase='edit-tag' 
                              addTag={addTag}/>
              </Modal>
              <Modal {...stack.register('delete-tag')} title="Confirm action" size="sm">
                <TagsModal
                              changeWindow={changeWindow} 
                              exitWindow={() => stack.closeAll()} 
                              removeTag={removeTag} 
                              addTag={addTag} 
                              editTag={editTag} 
                              currentCase="delete-tag" 
                              tags={tags}/>
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
                <Modal {...stack.register('edit-profile-field')} >
                <ProfileModals 
                              saveNewProfile={saveNewProfileField} 
                              deleteProfileField={removeProfile}
                              changeWindow={changeWindow}
                              exit ={() => stack.closeAll} 
                              currentCase='edit-profile-field'
                              prevTitle={selcetedProfile?.title}
                              prevDescription={selcetedProfile?.description ?? undefined}
                              shouldShowTags={selcetedProfile?.showTags}
                              selectedProfile= {selcetedProfile!}
                              prevOptions={selcetedProfile?.addedOptions}
                              wasMandatory={selcetedProfile?.mandatory}
                              />
                </Modal>
                <Modal {...stack.register('delete-profile-field')}>
                <ProfileModals 
                              saveNewProfile={saveNewProfileField} 
                              deleteProfileField={removeProfile}
                              changeWindow={changeWindow}
                              exit ={() => stack.closeAll} 
                              currentCase='delete-profile-field'
                              prevTitle={selcetedProfile?.title}
                              prevDescription={selcetedProfile?.description ?? undefined}
                              shouldShowTags={selcetedProfile?.showTags}
                              selectedProfile= {selcetedProfile!}
                              prevOptions={selcetedProfile?.addedOptions}
                              wasMandatory={selcetedProfile?.mandatory}
                              />
                </Modal>
              </Modal.Stack>
          </Stack>
        </Stack>
    </FADheader>
  );
}

export default Configure;

//  <Stack >
//<TextInput value={tagName}  onChange={(event) => setName(event.currentTarget.value)} error = {hasError} />
//<ColorPicker onChange={onChange} size="xl" value = {color} format="hex" swatches={tagColours} />
//<Button maw={320} onClick={() => createTag({name: tagName, color:color})}>Spara</Button>
//</Stack>
