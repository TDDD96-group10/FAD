import {Button, Group, Menu, MultiSelect, Stack } from "@mantine/core";
import { IconBookmark, IconCupOff, IconShirt } from "@tabler/icons-react";

type fadderProps = {
  name: string;
  shirtSize: string;
  alleries?: string;
  email: string;
  phone: string;
}


const SearchBar: React.FC = () => {

  //TODO: Fixa childrens keys
  const shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  const allergies = ['Jordnötter', 'Vegan', 'Vegetarian', 'Peskitarian']
  const fadderType = ['Häfvfadder', 'Donna', 'DG']
  const data = shirtSizes.concat(allergies.concat(fadderType))
  
  function setFilter(allergy: string): void {
    throw new Error("Function not implemented.");
  }

  return (
<Stack>
    <Group>
      <Menu position="bottom-end">
        <Menu.Target>
          <Button rightSection={<IconShirt size= {17}/>}>Tröjstorlekar</Button>
        </Menu.Target>
        <Menu.Dropdown >
        {shirtSizes.map((sizes, index) => (<Menu.Item onClick = {() => setFilter(sizes)} key={index}>{sizes}</Menu.Item>))}
        </Menu.Dropdown>
      </Menu>
      <Menu position="bottom-end">
        <Menu.Target>
          <Button rightSection={<IconCupOff size= {17}/>}>Alleriger</Button>
        </Menu.Target>
        <Menu.Dropdown >
        {allergies.map((allergy, index) => (<Menu.Item onClick = {() => setFilter(allergy)} key={index + 10}>{allergy}</Menu.Item>))}
        </Menu.Dropdown>
      </Menu>
      <Menu position="bottom-end">
        <Menu.Target>
          <Button rightSection={<IconBookmark size= {17}/>}>Taggar</Button>
        </Menu.Target>
        <Menu.Dropdown >
        {fadderType.map((type, index) => (<Menu.Item onClick = {() => setFilter(type)} key={index + 20}>{type}</Menu.Item>))}
        </Menu.Dropdown>
      </Menu>
    </Group>
    <MultiSelect searchable data={[
      { group: 'Frontend', items: [{ value: 'react', label: 'React' }, { value: 'ng', label: 'Angular' }] },
      { group: 'Backend', items: [{ value: 'express', label: 'Express' }, { value: 'django', label: 'Django' }] },]}>
    </MultiSelect>
  </Stack>
  );
};

export default SearchBar;