import { ActionIcon, AppShell, Burger, Button, Card, Checkbox, ColorPicker, Group, Modal, NavLink, Paper, Stack, TagsInput, TextInput, Title, useModalsStack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { IconSettings} from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import ConfigureTags from "./ConfigureTags";
import FADheader from "../components/header";


interface tagProps {
  name: string;
  color: string;
}

const Configure: React.FC = () => {

  const tagColours = ['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14'];
  
  const stack = useModalsStack(['create-tag','edit-tag','delete-tag','create-profile-field' ]);
  const [tagName, setName] = useState('');
  const [tags, setTags] = useState<tagProps[]>([]);
  const [color, onChange] = useState("");
  const [hasError, setError] = useState(false);
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [value, setValue] = useState<string[]>([]);

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
    else if(!newName){
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
                  <Stack >
                    <TextInput value={tagName}  onChange={(event) => setName(event.currentTarget.value)} error = {hasError} />
                      <ColorPicker onChange={onChange} size="xl" value = {color} format="hex" swatches={tagColours} />
                    <Button maw={320} onClick={() => createTag({name: tagName, color:color})}>Spara</Button>
                  </Stack>
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
                        error = {hasError}/>
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
                      <TextInput label="Rubrik"></TextInput>
                      <TextInput label="Beskrivning" description= "Kan lämnas tomt"></TextInput>
                      <Group>
                        <Button>Fritext</Button>
                        <Button onClick = {() => setMultipleChoice(true)}>Flervalsalternativ</Button>
                        {multipleChoice && <TagsInput value={value} onChange={setValue} miw = {345}></TagsInput>}
                        <Checkbox label= "Obligatorisk att fylla i"></Checkbox>
                      </Group>
                      <Group mt="lg" justify="space-between">
                        <Button onClick={stack.closeAll} variant="default">Avbryt</Button>
                        <Button color="red">Spara</Button>
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
            </Card>
          </Stack>
      </FADheader>
  );
}

export default Configure;

//rightSection={<IconSettings size = {14} />}
//<TextInput maw={320} value = {tagName} label = "Namn" onChange={(event) => setValue(event.currentTarget.tagName)} />
//<Paper withBorder p="md" radius="md" mb="md">
//<Title order={4} mb="xs">Skapa ny mapp</Title>
//<TextInput
//  label="Mappnamn"
//  placeholder="Ange mappens namn"
//  value={newFolderName}
//  onChange={(e) => setNewFolderName(e.currentTarget.value)}
//  mb="md"
///>
//<Button onClick={handleCreateFolder} fullWidth>
//  Skapa
//</Button>
//</Paper>