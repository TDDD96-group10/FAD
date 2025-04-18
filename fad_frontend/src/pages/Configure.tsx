import { Button, Card, Checkbox, ColorPicker, Group, Modal, NavLink, Paper, Stack, TagsInput, TextInput, Title, useModalsStack } from "@mantine/core";

import { useState } from "react";
import { IconSettings} from '@tabler/icons-react';

import FADheader from "../components/header";
import { error } from "openapi-typescript";


type tagProps = {
  name: string;
  color: string;
}

type inputOption = 'freeText' | 'multipleChoice';

type profileProps =  {
  title: string;
  description: string | null;
  inputType: inputOption;
  addedOptions?: string[];
  mandatory: boolean;
}

const Configure: React.FC = () => {

  const tagColours = ['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14'];
  
  const stack = useModalsStack(['create-tag','edit-tag','delete-tag','create-profile-field', 'edit-profile-field']);
  const [tagName, setName] = useState('');
  const [tags, setTags] = useState<tagProps[]>([]);
  const [color, onChange] = useState("");
  const [hasError, setError] = useState(false);

  //States related to new profile option.
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [profileInputType, setProfileInputType] = useState<inputOption>('freeText');
  const [addedOptions, setAddedOptions] = useState<string[]>([]);
  const [mandatory, setMandatory] = useState(false);
  const [profileFields, setProfileFileds] = useState<profileProps[]>([]);

  function createTag(newTag: tagProps){
    if(newTag.name && !tags.some(tag => tag.name === newTag.name)){
      setTags([...tags, newTag]);
      setName('');
      onChange('');
      setError(false);
      stack.closeAll();
    }
    else{
      setError(true)
    }
  }

  function saveNewProfileField(newProfile: profileProps) {
    const hasTitle = !!newProfile.title && newProfile.title.trim() !== '';
    const isMultipleChoice = newProfile.inputType === 'multipleChoice';
    const isFreeText = newProfile.inputType === 'freeText';
    const hasAddedOptions = addedOptions.length > 0;
  
    const isMissingOptions = hasTitle && isMultipleChoice && !hasAddedOptions;
    const isMissingTitleForFreeText = isFreeText && !hasTitle;
    const isMissingTitleForMultipleChoice = isMultipleChoice && hasAddedOptions && !hasTitle;
  
    if (!isMissingOptions && !isMissingTitleForFreeText && !isMissingTitleForMultipleChoice) {
      setProfileFileds(prev => [...prev, newProfile]);
      exitProfile();}
    else if (isMissingTitleForFreeText || isMissingTitleForMultipleChoice) {
      setError(true);
    }
  }
  
  

  function exitProfile(){
    stack.closeAll();
    setTitle('');
    setDescription('');
    setProfileInputType('freeText');
    setAddedOptions([]);
    setMandatory(false); 
    setError(false);
  }

  function newProfileInputType(multipleChoice: string){
    if(multipleChoice === 'multipleChoice'){
      setProfileInputType('multipleChoice');
    }
    else{
      setAddedOptions([]);
      setProfileInputType('freeText');
    }
  }
  
  function editTag(newName: string, color: string, index: number) {
    stack.closeAll();
    if(!tags.some(tag => tag.name === newName)){
      setError(true);
    }
    
    if (newName){
      setTags(prevTags => {
        const updatedTags = [...prevTags];
        updatedTags[index] = { name: newName, color: color };
        setName('');
        onChange('');
        setError(false);
        return updatedTags;
      });
    }
    else{
      setTags(prevTags => {
        const updatedTags = [...prevTags];
        const prevName = updatedTags[index].name
        updatedTags[index] = {name: prevName, color: color}
        setError(false);
        return updatedTags
      })

    }
  }

  function removeTag(index: number) {
    setTags(prevTags => prevTags.filter((_, i) => i !== index));
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
              <Modal.Stack>
                <Modal size="sm" title="Skapa tagg" {...stack.register('create-tag')}>
                
                </Modal>
                {tags.map((item, index) => (
                  <div>
                  <Group justify="flex-start">
                    <Button onClick={() => stack.open('edit-tag')} color={item.color} defaultValue={item.name} rightSection={<IconSettings size= {14}/>} > {item.name} </Button>
                    </Group>
                  <div>
                    <Modal {...stack.register('edit-tag')} title="Redigera tag" size="sm">
                      <Stack>
                      <TextInput 
                        maw={320} 
                        value={tagName} 
                        onChange={(event) => setName(event.currentTarget.value)}
                        error = {hasError}
                        />
                      <ColorPicker size="xl" onChange={onChange} value = {color} format="hex" swatches={tagColours}/>
                      </Stack>
                      <Group mt="lg" justify="space-between">
                        <Button onClick={ () => editTag(tagName, color, index)} >
                          Spara ändringar
                        </Button>
                        <Button onClick={() => stack.open('delete-tag')} color="red">
                          Radera tag
                        </Button>
                      </Group>
                    </Modal>

                    <Modal {...stack.register('delete-tag')} title="Confirm action" size="sm">
                      Är du säker på att du vill radera taggen? Den kommer att försvinna från alla platser där den
                      används.
                      <Group mt="lg" justify="space-between">
                        <Button onClick={stack.closeAll} variant="default">
                          Avbryt
                        </Button>
                        <Button onClick={() => removeTag(index)} color="red">
                          Radera
                        </Button>
                      </Group>
                    </Modal>
                    
                  </div>
                  </div>
                ))}
                  <Modal {...stack.register('create-profile-field')} title="Profilinformation" size="sm">
                    <Stack>
                      <TextInput label="Rubrik" variant="filled" value={title} error={hasError ? "Saknar titel" : ''} onChange={(event) => setTitle(event.currentTarget.value)}></TextInput>
                      <TextInput label="Beskrivning" variant="filled" description= "Kan lämnas tomt" value={description} onChange={(event) => setDescription(event.currentTarget.value)}></TextInput>
                      <Group>
                        <Button onClick={() => newProfileInputType('')}>Fritext</Button>
                        <Button onClick = {() => newProfileInputType('multipleChoice')}>Flervalsalternativ</Button>
                        {(profileInputType === 'multipleChoice') && <TagsInput variant="filled"
                                                                               value={addedOptions} 
                                                                               onChange={setAddedOptions} 
                                                                               miw = {345} 
                                                                               error={profileInputType === 'multipleChoice' && addedOptions.length === 0 ? "Lägg till alternativ" : ''} />}
                        <Checkbox label= "Obligatorisk att fylla i" onClick= {() => setMandatory(prev => !prev)}></Checkbox>
                      </Group>
                      <Group mt="lg" justify="space-between">
                        <Button onClick={exitProfile} variant="default">Avbryt</Button>
                        <Button color="red" onClick={() => 
                          saveNewProfileField({title: title, 
                                               description: description, 
                                               inputType: profileInputType, 
                                               addedOptions: addedOptions, 
                                               mandatory: mandatory})}>Spara</Button>
                      </Group>
                    </Stack>
                  </Modal>
                  <Modal {...stack.register('edit-profile-field')} >
                  <Stack>
                      <TextInput label="Rubrik" variant="filled" value={title} error={hasError ? "Saknar titel" : ''} onChange={(event) => setTitle(event.currentTarget.value)}></TextInput>
                      <TextInput label="Beskrivning" variant="filled" description= "Kan lämnas tomt" value={description} onChange={(event) => setDescription(event.currentTarget.value)}></TextInput>
                      <Group>
                        <Button onClick={() => newProfileInputType('')}>Fritext</Button>
                        <Button onClick = {() => newProfileInputType('multipleChoice')}>Flervalsalternativ</Button>
                        {(profileInputType === 'multipleChoice') && <TagsInput variant="filled"
                                                                               value={addedOptions} 
                                                                               onChange={setAddedOptions} 
                                                                               miw = {345} 
                                                                               error={profileInputType === 'multipleChoice' && addedOptions.length === 0 ? "Lägg till alternativ" : ''} />}
                        <Checkbox label= "Obligatorisk att fylla i" onClick= {() => setMandatory(prev => !prev)}></Checkbox>
                      </Group>
                      <Group mt="lg" justify="space-between">
                        <Button onClick={exitProfile} variant="default">Avbryt</Button>
                        <Button color="red" onClick={() => 
                          saveNewProfileField({title: title, 
                                               description: description, 
                                               inputType: profileInputType, 
                                               addedOptions: addedOptions, 
                                               mandatory: mandatory})}>Spara</Button>
                      </Group>
                    </Stack>
                  </Modal>
                </Modal.Stack>
              </Card>
            </Stack>
            <Card>
            <Title order={2}>Profilsidan</Title>
            <Title order={4}>Om ni saknar information kan ni skapa en ny rubrik här, där ni kan välja att de kan skriva i fritext, eller faddrarna ska få olika alternativ att välja mellan.</Title>
            <Button onClick={() => stack.open('create-profile-field')}>Lägg till profilinformation</Button>
            {profileFields.map((value, index) =>(<Button onClick = {() => stack.open('edit-profile-field')} key={index}> {value.title}</Button>))}
            </Card>
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