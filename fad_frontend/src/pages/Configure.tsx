import { AppShell, Burger, Button, Card, ColorPicker, Group, Modal, NavLink, Paper, Stack, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { modals } from '@mantine/modals';

interface tagProps {
  name: string;
  colour: string;
}




const Configure: React.FC = () => {

  const tagColours = ['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14'];
  

  const [opened, { open, close }] = useDisclosure();
  //const [open, setOpen] = useState(false);
  const [tagName, setName] = useState('');
  const [tags, setTags] = useState<tagProps[]>([]);
  const [color, onChange] = useState("")

  function addTag(newTag: tagProps){
    setTags([...tags, newTag]);
    setName('');
    onChange('');
    close();
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
            opened={opened}
            
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
                <Button onClick={open}>Lägg till tagg</Button>

                {opened && 
                <Modal size="sm" opened={opened} onClose={close} >
                  <Stack >
                    <TextInput value={tagName}  onChange={(event) => setName(event.currentTarget.value)}/>
                    <ColorPicker  onChange={onChange} size="xl" value = {color} format="hex" swatches={tagColours} />
                    <Button maw={320} onClick={() => addTag({name: tagName, colour:color})}>Spara</Button>
                  </Stack>
                </Modal>
                }
              <div>
                {tags.map((item, index) => (
                  <Button color={item.colour} key={index} >
                    <p>{item.name}</p>
                  </Button>
                ))}
              </div>
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