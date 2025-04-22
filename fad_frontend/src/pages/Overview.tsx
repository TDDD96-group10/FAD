import FADheader from "../components/header"
import { useState } from "react";
import SearchBar from "../components/searchBar";
import { Table, Checkbox, Chip} from '@mantine/core';
import { allData } from './data';

type tagsProps = {
  name: string;
  color: string
}

type fadderProps = {
  name: string;
  shirtSize: string;
  allergies?: string;
  fadderType?: tagsProps[]
  email: string;
  phone: string;
}

function FadderTable() {
  const [selected, setSelected] = useState<string[]>([]); 
  const data = allData;

  const toggleCheckbox = (name: string) => {
    setSelected((curr) =>
      curr.includes(name) ? curr.filter((n) => n !== name) : [...curr, name]
    );
  };
  const newRows = data.map(({name, shirtSize, allergies, fadderType, phone}:fadderProps) => (
    <Table.Tr key={name} onClick={() => toggleCheckbox(name)}>
      <Table.Td>{<Checkbox  ></Checkbox>}</Table.Td>
      <Table.Td onClick= {() => console.log(name)}>{name}</Table.Td>   
      <Table.Td>{fadderType?.map((val, index) => <Chip size="xs" p={1} key= {index} defaultChecked color={val.color}>{val.name}</Chip>)}</Table.Td>
      <Table.Td>{shirtSize}</Table.Td>
      <Table.Td>{allergies}</Table.Td>
      <Table.Td>{phone}</Table.Td>
    </Table.Tr>
  ))
  return (
    <Table highlightOnHover striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th>Namn</Table.Th>
          <Table.Th>Faddertyp</Table.Th>
          <Table.Th>Tröjstorlek</Table.Th>
          <Table.Th>Allergier</Table.Th>
          <Table.Th>Telefonnummer</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{newRows}</Table.Tbody>
    </Table>
  );
}


const Overview: React.FC = () => {
  //Dummy data
  const shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  const allergies = ['Jordnötter', 'Vegan', 'Vegetarian', 'Peskitarian']
  const fadderType = ['Häfvfadder', 'Donna', 'DG']
  const data = shirtSizes.concat(allergies.concat(fadderType))

  
  const [filter, setFilter] = useState('');

    return (
      <FADheader>
        <SearchBar/>   
        <FadderTable></FadderTable>
      </FADheader>   
    );
};

export default Overview;


