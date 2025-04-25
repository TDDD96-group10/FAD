import {Button, Group, Menu, Modal, MultiSelect, Stack, TagsInput, TextInput, useModalsStack } from "@mantine/core";
import { IconBookmark, IconCupOff, IconShirt } from "@tabler/icons-react";
import { useState } from "react";
import { fadderProps, searchBarProps, shirtSize, fadderType } from "../pages/types";
import React from "react";



const SearchBar: React.FC<searchBarProps> = ({ editTags, selected, editFadder, updateSelected, singleFadder, updateFadder}) => {

  //TODO: Fixa childrens keys
  const allergies = ['Jordnötter', 'Vegan', 'Vegetarian', 'Peskitarian']
  const fadderTypeDict:fadderType[] = [{name: 'häfvfadder', color:'blue'}, { name: 'Donna', color: 'pink' }, { name: 'klassfadder', color: 'green' }, { name: 'DG', color: 'yellow' }]
  const stack = useModalsStack(['edit-single-fadder', 'edit-multiple-fadder']);
  const shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  const defaultFadder: fadderProps = {firstName: '', lastName: '', shirtSize: '', email: '', phone: '',
                                      id: '', allergies: '',fadderType: [],};

  // Use singleFadder or fallback to defaultFadder
  const [updatedFadder, setUpdatedFadder] = useState<fadderProps>(singleFadder || defaultFadder);
  const [firstName, setFirstName] = useState<string>(singleFadder?.firstName ?? '');
  const [lastName, setLastName] = useState<string>(singleFadder?.lastName ?? '');
  const currentShirtSize = [singleFadder?.shirtSize ?? ''];
  const [updatedShirtSize, setUpdateShirtSize] = useState<string[]>(currentShirtSize ?? []);
  const [updatedEmail, setUpdatedEmail] = useState<string>(singleFadder?.email ?? '');
  const [updatedPhone, setUpdatedPhone] = useState<string>(singleFadder?.phone ?? '');
  const [id, setId] = useState<string>(singleFadder?.id ?? '');
  const [updatedFadderType, setUpdatedFadderType] = useState<fadderType[]>(singleFadder?.fadderType ?? []);
  const [shitter, setShitter] = useState<string[]>([]);

  React.useEffect(() => {
    setUpdatedFadder(singleFadder || defaultFadder);
    setFirstName(singleFadder?.firstName ?? '');
    setLastName(singleFadder?.lastName ?? '');
    setUpdateShirtSize(updatedShirtSize);
    setUpdatedEmail(updatedEmail ?? '');
    setUpdatedPhone(singleFadder?.phone ?? '');
    setUpdatedFadderType(singleFadder?.fadderType ?? []);
  }, [singleFadder]);

  function setFilter(allergy: string): void {
    throw new Error("Function not implemented.");
  }
  function fadderUpdateType(type:string[]){
    setShitter(type)
    setUpdatedFadderType(fadderTypeDict.filter(fadder => type.includes(fadder.name)))

  }

  return (
  <Stack>
    <Group>
      {singleFadder?.fadderType?.map(val =><p>{val.name}</p>)}
      <Button disabled={!editFadder} onClick={() => stack.open("edit-single-fadder")}>Redigera fadder</Button>
      <Button disabled={!editTags} onClick={()=> stack.open("edit-multiple-fadder")}>Ändra taggar</Button>
      <Menu position="bottom-end">
        <Menu.Target>
          <Button rightSection={<IconShirt size= {17}/>}>Tröjstorlekar</Button>
        </Menu.Target>
        <Menu.Dropdown >
        {shirtSizes.map((sizes, index) => (<Menu.Item onClick = {() => setFilter(sizes)} key={index}> {sizes}</Menu.Item>))}
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
        {fadderTypeDict.map((type, index) => (<Menu.Item onClick = {() => setFilter(type.name)} key={index + 20}>{type.name}</Menu.Item>))}
        </Menu.Dropdown>
      </Menu>
    </Group>
    <MultiSelect searchable data={[
      { group: 'Frontend', items: [{ value: 'react', label: 'React' }, { value: 'ng', label: 'Angular' }] },
      { group: 'Backend', items: [{ value: 'express', label: 'Express' }, { value: 'django', label: 'Django' }] },]}>
    </MultiSelect>
    <Modal.Stack>
      <Modal title={'Redigera fadder'}{...stack.register('edit-single-fadder')}>
        <TextInput  label={'Förnamn'}
                    value={firstName} 
                    onChange={(event) => setFirstName(event.currentTarget.value)}/>
        <TextInput  label={'Efternamn'}
                    value={lastName} 
                    onChange={(event) => setLastName(event.currentTarget.value)}/>

        <TagsInput  label={'Tröjstorlek'}
                    defaultValue={updatedShirtSize} 
                    maxTags={1} data={shirtSizes}></TagsInput>
        <TextInput  label={'Email'}
                    value={updatedEmail} 
                    onChange={(event) => setUpdatedEmail(event.currentTarget.value)}/>
        <TextInput  label={'Telefon'}
                    value={updatedPhone} 
                    onChange={(event) => setUpdatedPhone(event.currentTarget.value)}/>
        <MultiSelect 
                    defaultValue={updatedFadderType.map(val => val.name)} 
                    data={fadderTypeDict.map(val => val.name)}
                    value={shitter}
                    onChange={fadderUpdateType}/>
        <Group>
        <Button onClick={stack.closeAll}>Avbryt</Button>
        <Button 
              onClick={() => updateFadder({ 
                firstName: firstName, 
                lastName: lastName, 
                shirtSize: updatedShirtSize[0], 
                allergies:'hej',
                fadderType: updatedFadderType,
                email: updatedEmail, 
                phone: updatedPhone, 
                id: singleFadder?.id ?? 'hej',
                
              })}
            >
              Spara
        </Button>
        </Group>
      </Modal>
      <Modal {...stack.register('edit-multiple-fadder')}>
        
        
      </Modal>
      
    </Modal.Stack>


  </Stack>
  );
};

export default SearchBar;