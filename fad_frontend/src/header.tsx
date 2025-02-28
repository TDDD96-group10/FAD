import { AppShell, AppShellSection, Burger, Flex, Group, NavLink, Paper, Stack, Text } from '@mantine/core';
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
          <div>FAD</div>
          </AppShell.Header>
          <AppShell.Navbar p="md">
            <NavLink label ="Home" href='/home'></NavLink>
              <NavLink label ="Test" href='/test'></NavLink>
              <NavLink label ="Contact" href='/#'></NavLink>
            </AppShell.Navbar>
          <AppShell.Main>Main</AppShell.Main>
        </AppShell>
      </div>

    );
}

export default FADheader;