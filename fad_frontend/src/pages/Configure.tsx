import { ActionIcon, AppShell, Burger, Button, Card, ColorPicker, Group, Modal, NavLink, Paper, Stack, TextInput, Title, useModalsStack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { IconSettings} from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import ConfigureTags from "./ConfigureTags";


interface tagProps {
  name: string;
  color: string;
}

const Configure: React.FC = () => {

  const tagColours = ['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14'];
  
  const stack = useModalsStack(['create-tag','edit-tag','delete-tag', ]);
  const [tagName, setName] = useState('');
  const [tags, setTags] = useState<tagProps[]>([]);
  const [color, onChange] = useState("");
  const [hasError, setError] = useState(false);

  function createTag(newTag: tagProps){
    if(newTag.name || tags.some(tag => tag.name === newTag.name)){
      setTags([...tags, newTag]);
      setName('');
      onChange('');
      stack.closeAll();
      setError(false);
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
    <>
      <AppShell
      header={{ height: 60 }}
      navbar={{
              width: 300,
              breakpoint: 'sm',
            //  collapsed: { mobile: !opened },
      }}
      padding="md">
        <AppShell.Header>
          <Burger
            hiddenFrom="sm"
            size="sm"
          />
          <Group justify='space-between'> 
            <div>FAD</div>
            <Button>Byt Theme</Button>
          </Group>

        </AppShell.Header>
        <AppShell.Navbar p="md">
            <NavLink label ="Home" href='/home'></NavLink>
            <NavLink label ="Configure" href='/configure'></NavLink>
            <NavLink label ="Shareinfo" href='/home/shareinfo'></NavLink>
            <NavLink label ="Test404" href='/home/test'></NavLink>
            <NavLink label ="Contact (#)" href='/home/#'></NavLink>
            <NavLink label ="Logout" href='/'></NavLink>
          
        </AppShell.Navbar>
        <AppShell.Main>
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
                      Are you sure you want to perform this action? This action cannot be undone. If you are
                      sure, press confirm button below.
                      <Group mt="lg" justify="space-between">
                        <Button onClick={stack.closeAll} variant="default">
                          Cancel
                        </Button>
                        <Button onClick={() => removeTag(index)} color="red">
                          Confirm
                        </Button>
                      </Group>
                    </Modal>
                  </div>
                  </div>
                ))}
                </Modal.Stack>
              </Card>
            </Stack>
          </Stack>
        </AppShell.Main>
      </AppShell>
    </>

  );
}

export default Configure;

//rightSection={<IconSettings size = {14} />}
//<TextInput maw={320} value = {tagName} label = "Namn" onChange={(event) => setValue(event.currentTarget.tagName)} />