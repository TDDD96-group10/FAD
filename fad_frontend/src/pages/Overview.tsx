import FADheader from "../components/header"
import { useState } from "react";
import SearchBar from "../components/searchBar";
import { Table, Checkbox, Chip} from '@mantine/core';
import { allData } from './data';
import { fadderProps, overviewProps } from "./types";


const Overview: React.FC<overviewProps> = () => {

  const shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  const allergies = ['Jordnötter', 'Vegan', 'Vegetarian', 'Peskitarian']
  const fadderType = ['Häfvfadder', 'Donna', 'DG']
  const data = allData
  const defaultFadder:fadderProps= {firstName: '', lastName: '', shirtSize: '', email: '',
                                    phone: '', id: '', fadderType: [], allergies: ''}
  const [table, setTable] = useState<fadderProps[]>(data);
  const [selectedFaddrar, setSelectedFaddrar] = useState<fadderProps[]>([]);
  const editTags = selectedFaddrar.length > 1;
  const editFadder = selectedFaddrar.length === 1;
  const [allFaddrar, setAllFadrar] =  useState<fadderProps[]>(data);

  function updateTags(updated: fadderProps[]){
    const updatedFaddrar = new Map(updated.map(prop => [prop.id, prop]));
    const result = allFaddrar.map(prop => 
      updatedFaddrar.has(prop.id) ? updatedFaddrar.get(prop.id)! : prop
    );
    setTable(result)
  }
  function updateMultipleTags(updated: fadderProps[]){
    const updatedFaddrar = new Map(updated.map(prop => [prop.id, prop]));
    const result = allFaddrar.map(prop => 
      updatedFaddrar.has(prop.id) ? updatedFaddrar.get(prop.id)! : prop
    );
    setTable(result)
    setSelectedFaddrar(updated)
  }

  const rows = table.map((fadder) => (
    <Table.Tr
      key={fadder.id}
      bg={selectedFaddrar.some((row) => row.id === fadder.id) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedFaddrar.some((row) => row.id === fadder.id)}
          onChange={(event) => {
            const isChecked = event.currentTarget.checked;
            if (isChecked) {
              if (!selectedFaddrar.some((id) => id.id === fadder.id)) {
                setSelectedFaddrar([...selectedFaddrar, fadder]);
              }
            } else {
              setSelectedFaddrar(selectedFaddrar.filter((id) => id.id !== fadder.id));
            }
          }}
        />
      </Table.Td>
      <Table.Td>{fadder.firstName + " " + fadder.lastName}</Table.Td>
      <Table.Td>{fadder.fadderType?.map((val, index) => 
                <Chip size="xs" p={1} key= {fadder.id+ index} defaultChecked color={val.color}>{val.name}</Chip>)}
      </Table.Td>
      <Table.Td>{fadder.shirtSize}</Table.Td>
      <Table.Td>{fadder.phone}</Table.Td>
      <Table.Td>{fadder.allergies}</Table.Td>
    </Table.Tr>
  ));


    return (
      <FADheader>
        <SearchBar updateSelected = {updateTags}
                   updateFadder={(updatedFadder: fadderProps) => {
                    if (!updatedFadder.id) return;
                    setTable((prevTable) =>
                      prevTable.map((item) =>
                        item.id === updatedFadder.id ? { ...item, ...updatedFadder } : item
                      )
                    );
                    setSelectedFaddrar((prevSelected) =>
                      prevSelected.map((item) =>
                        item.id === updatedFadder.id ? { ...item, ...updatedFadder } : item
                      )
                    );
                  }}
                   selectedFaddrar={selectedFaddrar} 
                   editTags={editTags} 
                   editFadder={editFadder} 
                   singleFadder={selectedFaddrar.length === 1 ? selectedFaddrar[0] : defaultFadder} 
                   updateMultipleTags={(val) => updateMultipleTags(val)}
                   />   
        <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{<Checkbox onChange = {() => 
                                  selectedFaddrar.length === data.length ?
                                  setSelectedFaddrar([]) : setSelectedFaddrar(data)}/>}</Table.Th>
            <Table.Th>Namn</Table.Th>
            <Table.Th>Faddertyp</Table.Th>
            <Table.Th>Tröjstorlekar</Table.Th>
            <Table.Th>Telefon</Table.Th>
            <Table.Th>Allergier</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </FADheader>   
    );
};

export default Overview;


