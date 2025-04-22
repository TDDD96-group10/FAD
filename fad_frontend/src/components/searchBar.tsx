import {Button, Group, Menu, MultiSelect, Stack } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const SearchBar: React.FC = () => {
  
  return (
  <Stack>
    <Group>
    <Menu>
      <Menu.Target>
        <Button>Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconSearch size={14} />}
          disabled
        >
          Search
        </Menu.Item>

        {/* Other items ... */}
      </Menu.Dropdown>
    </Menu>

    </Group>
    <MultiSelect searchable></MultiSelect>
  </Stack>
  );
};

export default SearchBar;