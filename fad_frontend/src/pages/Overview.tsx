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
  const [selectedIds, setSelectedIds] = useState<fadderProps[]>([]);
  const editTags = selectedIds.length > 1;
  const editFadder = selectedIds.length === 1;

  function updateTags(updated: fadderProps[]){}

  const rows = table.map((fadder) => (
    <Table.Tr
      key={fadder.id}
      bg={selectedIds.some((row) => row.id === fadder.id) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedIds.some((row) => row.id === fadder.id)}
          onChange={(event) => {
            const isChecked = event.currentTarget.checked;
          
            if (isChecked) {
              if (!selectedIds.some((id) => id.id === fadder.id)) {
                setSelectedIds([...selectedIds, fadder]);
              }
            } else {
              setSelectedIds(selectedIds.filter((id) => id.id !== fadder.id));
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
                    setSelectedIds((prevSelected) =>
                      prevSelected.map((item) =>
                        item.id === updatedFadder.id ? { ...item, ...updatedFadder } : item
                      )
                    );
                    console.log(updatedFadder);
                  }}
                   selected={selectedIds} 
                   editTags={editTags} 
                   editFadder={editFadder} 
                   singleFadder={selectedIds.length === 1 ? selectedIds[0] : defaultFadder} />   
        <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{<Checkbox onChange = {() => 
                                  selectedIds.length === data.length ?
                                  setSelectedIds([]) : setSelectedIds(data)}/>}</Table.Th>
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


