import {Button, Group, Menu, Modal, MultiSelect, Stack, TagsInput, TextInput, useModalsStack } from "@mantine/core";
import { IconBookmark, IconCupOff, IconShirt } from "@tabler/icons-react";
import { useState } from "react";
import { fadderProps, searchBarProps, shirtSize, fadderType } from "../pages/types";
import React from "react";



const SearchBar: React.FC<searchBarProps> = ({ editTags, selected, editFadder, updateSelected, singleFadder, updateFadder}) => {
  React.useEffect(() => {
    const currentFadder = singleFadder || defaultFadder;
    setUpdatedFadder(currentFadder);
    setShirtSize(currentFadder.shirtSize ? [currentFadder.shirtSize] : ['']);
    setfadderType(currentFadder.fadderType?.map(ft => ft.name) ?? []);
  }, [singleFadder]);
  
  //TODO: Fixa allergies
  const allergies = ['Jordnötter', 'Vegan', 'Vegetarian', 'Peskitarian']
  const fadderTypeDict:fadderType[] = [{name: 'häfvfadder', color:'blue'}, { name: 'Donna', color: 'pink' }, { name: 'klassfadder', color: 'green' }, { name: 'DG', color: 'yellow' }]
  const stack = useModalsStack(['edit-single-fadder', 'edit-multiple-fadder']);
  const shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  const defaultFadder: fadderProps = {firstName: '', lastName: '', shirtSize: '', email: '', phone: '',
                                      id: '', allergies: '',fadderType: []};

  const defaultTags = singleFadder?.fadderType?.map(val=> val.name) ?? [];
  const defaultShirtSize: string[] = singleFadder?.shirtSize ? [singleFadder.shirtSize] : [''];


  const [updatedFadder, setUpdatedFadder] = useState<fadderProps>(singleFadder || defaultFadder);
  const [fadderType, setfadderType] = useState<string[]>([]);
  const [shirtSize, setShirtSize] = useState<string[]>(defaultShirtSize);
  
  function setFilter(allergy: string): void {
    throw new Error("Function not implemented.");
  }
  

  return (
  <Stack>
    <p>{singleFadder?.shirtSize}</p>
    <>{defaultShirtSize}</>
    <Group>
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
                    value={updatedFadder.firstName} 
                    onChange={(event) => setUpdatedFadder((prev) => ({
                                      ...prev, firstName: event.currentTarget.value}))}/>
        <TextInput  label={'Efternamn'}
                    value={updatedFadder.lastName} 
                    onChange={(event) => setUpdatedFadder((prev) => ({
                      ...prev, lastName: event.currentTarget.value}))}/>

        <TagsInput  label={'Tröjstorlek'}
                    value={shirtSize}
                    defaultValue={[updatedFadder.shirtSize]}
                    maxTags={1} 
                    onChange={(val) => {
                      setShirtSize(val);
                      setUpdatedFadder((prev) => ({ ...prev, shirtSize: val[0] || '' }));
                    }}
                    data={shirtSizes}
                    error={shirtSize.length !== 1}
                  
                    />
        <TextInput  label={'Email'}
                    value={updatedFadder.email} 
                    onChange={(event) => setUpdatedFadder((prev) => ({
                      ...prev, firstName: event.currentTarget.value}))}/>
        <TextInput  label={'Telefon'}
                    value={updatedFadder.phone} 
                    onChange={(event) => setUpdatedFadder((prev) => ({
                      ...prev, firstName: event.currentTarget.value}))}/>
        <MultiSelect 
                    label={'Taggar'}
                    defaultValue={defaultTags} 
                    data={fadderTypeDict.map(val => val.name)}
                    value={fadderType}
                    onChange={(val) => {
                      setfadderType(val);
                      const createFadderTypes = fadderTypeDict.filter(fadder => val.includes(fadder.name));
                      setUpdatedFadder((prev) => ({...prev, fadderType:createFadderTypes}));
                    }}/>
        <Group>
        <Button onClick={stack.closeAll}>Avbryt</Button>
        <Button onClick={() => {updateFadder(updatedFadder);
                                stack.closeAll();
                                }}
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