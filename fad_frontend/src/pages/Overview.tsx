import FADheader from "../components/header"
import { useState } from "react";
import SearchBar from "../components/searchBar";
import { Table, Checkbox, Chip} from '@mantine/core';
import { allData } from './data';
import { v4 as uuidv4 } from 'uuid';

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
  id?: string;
}

export function FadderTable() {
  
   
  const data: fadderProps[] = allData.map((value: fadderProps) => ({
    ...value,
    id: value.id ?? uuidv4(), // Keep existing ID if it exists, or generate a new one
  }));
  const [faddrar, setFaddrar] = useState<fadderProps[]>(data);
  
  const toggleCheckbox = (fadder: fadderProps) => {
    setFaddrar((curr:fadderProps[]) =>
      curr.some((item) => item.id === fadder.id)
        ? curr.filter((item) => item.id !== fadder.id)
        : [...curr, fadder]
    );
  };
  
  const newRows = data.map((fadder:fadderProps) => (
    <Table.Tr key={fadder.id} onClick={() => toggleCheckbox(fadder)}>
      <Table.Td>{<Checkbox ></Checkbox>}</Table.Td>
      <Table.Td onClick= {() => console.log(fadder.name)}>{fadder.name}</Table.Td>   
      <Table.Td>{fadder.fadderType?.map((val, index) => <Chip size="xs" p={1} key= {index} defaultChecked color={val.color}>{val.name}</Chip>)}</Table.Td>
      <Table.Td>{fadder.shirtSize}</Table.Td>
     
      <Table.Td>{fadder.phone}</Table.Td>
      <Table.Td>{fadder.allergies}</Table.Td>
    </Table.Tr>
  ))
  return (
    <Table highlightOnHover striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th><Checkbox></Checkbox></Table.Th>
          <Table.Th>Namn</Table.Th>
          <Table.Th>Faddertyp</Table.Th>
          <Table.Th>Tröjstorlek</Table.Th>
          <Table.Th>Telefonnummer</Table.Th>
          <Table.Th>Allergier</Table.Th>
         
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{newRows}</Table.Tbody>
    </Table>
  );
}

type overviewProps = {
  faddrar: fadderProps[];
}

const Overview: React.FC<overviewProps> = ({ faddrar }) => {
  //Dummy data
  const shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  const allergies = ['Jordnötter', 'Vegan', 'Vegetarian', 'Peskitarian']
  const fadderType = ['Häfvfadder', 'Donna', 'DG']
  const data = shirtSizes.concat(allergies.concat(fadderType))
  
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState<fadderProps[]>([]);
  const modify = selected.length > 0;


    return (
      <FADheader>
        <SearchBar modify={modify}/>   
        <FadderTable></FadderTable>
      </FADheader>   
    );
};

export default Overview;


