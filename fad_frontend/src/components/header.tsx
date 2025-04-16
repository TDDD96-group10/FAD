import { AppShell, Burger, Button, Group, NavLink} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { ReactNode } from 'react';



type FADLayoutProps = {
  children: ReactNode;
};

export const FADheader:  React.FC<FADLayoutProps> = ({ children }) => {

    const [opened, { toggle }] = useDisclosure();

    return (
      <>
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
            <NavLink label ="Home" href='/demo'/>
            <NavLink label ="Shareinfo" href='/shareinfo'/>
            <NavLink label ="Contact (#)" href='/home'/>
            <NavLink label ="Configure" href='/configure'/>
          </AppShell.Navbar>
          <AppShell.Main>
          {children} 
          </AppShell.Main>
        </AppShell>
      </>

    );
}

export default FADheader;