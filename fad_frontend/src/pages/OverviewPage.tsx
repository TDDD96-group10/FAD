import FADheader from "../components/Header"
import { useState } from "react";
import TageManger from "../components/TageManger";
import { Table,  Chip, Button, Modal, Stack, Group } from '@mantine/core';
import { useApi } from "../hooks/useApi";
import { apiClient } from "../api/ApiClient";
import {UserTags} from "../api/Api";
import EditFadderOverview from "../components/EditFadderOverview";
import ImportFadder from "../components/ImportFadder";
import AddFadder from "../components/AddFadder";


const OverviewPage: React.FC = () => {
  const [urlParamter, setUrlParamter] = useState<string>("deafult");
  const { data, loading, error } = useApi(() => apiClient.portal.portalFadderOverviewRead(urlParamter),undefined,null,urlParamter);
  const [opened, setOpened] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
 

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error} {JSON.stringify(data, null, 2)}</p>;

  const rows = data?.users.map((fadder:UserTags) =>  {
  

   return  <Table.Tr key={fadder.user_id} >
      <Table.Td><Button onClick={() =>  {setOpened(true); setSelectedUserId(fadder.user_id)}}>Redigera {fadder.user_id}</Button></Table.Td>
      <Table.Td>{fadder.user_id}</Table.Td>
      <Table.Td>{fadder.name}</Table.Td>
      <Table.Td>{fadder.phone_number}</Table.Td>
      <Table.Td>{fadder.email}</Table.Td>
      <Table.Td>{fadder.tags.map((value, index) => (<Chip checked={true} size="xs" p={1} key= {fadder.user_id+ index} defaultChecked>{value}</Chip>))}</Table.Td>
      {fadder.tagvalues_free_text.map((value:string) => (<Table.Td>{value}</Table.Td>))}
      {fadder.tagvalues_multivalue.map((values:string[]) => (<Table.Td>{values.map((value:string, index:number) => (<Chip checked={true} size="xs" p={1} key= {fadder.user_id+ index} defaultChecked>{value}</Chip>))}</Table.Td>)) }
    </Table.Tr>
});


    return (
      <FADheader>
        <Stack>
          <Group>
            <ImportFadder/>
            <AddFadder/>
          </Group>
        <TageManger tags_costum={data?.tagvalues_multivalue_name} tags={data?.tags?.fadder_tags} setUrlParameter={setUrlParamter} /> 
        </Stack>
        <Modal title={'Redigera fadder'}  opened={opened}
        onClose={() => setOpened(false)}
        ><EditFadderOverview id={selectedUserId} /></Modal>
      
      
        <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Redigera</Table.Th>
            {data?.table_head.map((value:string) => (<Table.Th>{value}</Table.Th>))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </FADheader>   
    );
};

export default OverviewPage;


