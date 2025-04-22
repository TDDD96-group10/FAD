import { Button, Group, Menu, MultiSelect, Stack } from "@mantine/core";
import FADheader from "../components/header"
import SearchBar from "../components/searchBar";
import { IconCupOff, IconSearch, IconShirt } from "@tabler/icons-react";
import { useState } from "react";

type fadderProps = {
  name: string;
  shirtSize: string;
  alleries?: string;
  email: string;
  phone: string;
}

const Overview: React.FC = () => {
  //Dummy data
  const shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  const allergies = ['Jordnötter', 'Vegan', 'Vegetarian', 'Peskitarian']
  const fadderType = ['Häfvfadder', 'Donna', 'DG']
  const data = shirtSizes.concat(allergies.concat(fadderType))

  const faddrar:fadderProps[] = [
    {
      name: "Anna Andersson",
      shirtSize: "M",
      alleries: "Nötter",
      email: "anna@example.com",
      phone: "0701234567",
    },
    {
      name: "Johan Johansson",
      shirtSize: "L",
      email: "johan@example.com",
      phone: "0709876543",
    },
    {
      name: "Sara Svensson",
      shirtSize: "S",
      alleries: "Laktos",
      email: "sara@example.com",
      phone: "0701112233",
    },
  ];
  

  const [filter, setFilter] = useState('');

  
    return (
      <FADheader>
        <Stack>
          <Group>
          <Menu position="bottom-end">
            <Menu.Target>
              <Button rightSection={<IconShirt size= {17}/>}>Tröjstorlekar</Button>
            </Menu.Target>
            <Menu.Dropdown >
            {shirtSizes.map((sizes) => (<Menu.Item onClick = {() => setFilter(sizes)} key={sizes}>{sizes}</Menu.Item>))}
            </Menu.Dropdown>
          </Menu>
          <Menu position="bottom-end">
            <Menu.Target>
              <Button rightSection={<IconCupOff size= {17}/>}>Alleriger</Button>
            </Menu.Target>
            <Menu.Dropdown >
            {allergies.map((allergy) => (<Menu.Item onClick = {() => setFilter(allergy)} key={allergy}>{allergy}</Menu.Item>))}
            </Menu.Dropdown>
          </Menu>
          <Menu position="bottom-end">
            <Menu.Target>
              <Button rightSection={<IconShirt size= {17}/>}>Alleriger</Button>
            </Menu.Target>
            <Menu.Dropdown >
            {fadderType.map((type) => (<Menu.Item onClick = {() => setFilter(type)} key={type}>{type}</Menu.Item>))}
            </Menu.Dropdown>
          </Menu>


          </Group>
          <MultiSelect searchable data={[
        { group: 'Frontend', items: [{ value: 'react', label: 'React' }, { value: 'ng', label: 'Angular' }] },
        { group: 'Backend', items: [{ value: 'express', label: 'Express' }, { value: 'django', label: 'Django' }] },
      ]}></MultiSelect>
        </Stack>
      </FADheader>   
    );
};

export default Overview;