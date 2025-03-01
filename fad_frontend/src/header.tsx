import { AppShell, Burger, Button, Group, NavLink} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


const FADheader: React.FC = () => {

    const [opened, { toggle }] = useDisclosure();

    return (
      <div>
        <AppShell
        header={{ height: 60 }}
        navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
        }}
        padding="md">
          <AppShell.Header>
            <Burger
              opened={opened}
              onClick={toggle}
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
              <NavLink label ="Test" href='/test'></NavLink>
              <NavLink label ="Contact" href='/#'></NavLink>
            </AppShell.Navbar>
          <AppShell.Main>
            <Button>HEJHEJEHJEHJE</Button>

          </AppShell.Main>
        </AppShell>
      </div>

    );
}

export default FADheader;