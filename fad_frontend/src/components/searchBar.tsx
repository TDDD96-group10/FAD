import {Button, Group, Menu, Modal, MultiSelect, Stack, TagsInput, TextInput, useModalsStack } from "@mantine/core";
import { IconBookmark, IconCupOff, IconShirt } from "@tabler/icons-react";
import { useState } from "react";
import { fadderProps, searchBarProps, shirtSize, fadderType } from "../pages/types";
import React from "react";



const SearchBar: React.FC<searchBarProps> = ({ editTags, selected, editFadder, updateSelected, singleFadder, updateFadder}) => {

  //TODO: Lös hur allergier ska fixas.
  const allergies = ['Jordnötter', 'Vegan', 'Vegetarian', 'Peskitarian']
  const fadderTypeDict:fadderType[] = [{name: 'häfvfadder', color:'blue'}, { name: 'Donna', color: 'pink' }, { name: 'klassfadder', color: 'green' }, { name: 'DG', color: 'yellow' }]
  const stack = useModalsStack(['edit-single-fadder', 'edit-multiple-fadder']);
  const shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  const defaultFadder: fadderProps = {firstName: '', lastName: '', shirtSize: '', email: '', phone: '',
                                      id: '', allergies: '',fadderType: [],};
  const defaultTags = singleFadder?.fadderType?.map(val => val.name);
  // Use singleFadder or fallback to defaultFadder
  const [updatedFadder, setUpdatedFadder] = useState<fadderProps>(singleFadder || defaultFadder);
  const [updatedPhone, setUpdatedPhone] = useState<string>(singleFadder?.phone ?? '');
  const [updatedFadderType, setUpdatedFadderType] = useState<fadderType[]>(singleFadder?.fadderType ?? []);
  const [fadderTypes, setFadderTypes] = useState<string[]>(singleFadder?.fadderType?.map(type =>type.name) ?? []);

  React.useEffect(() => {
    setUpdatedFadderType(singleFadder?.fadderType ?? []);
  }, [singleFadder]);

  function fadderUpdateType(type:string[]){
    setFadderTypes(type)
    setUpdatedFadderType(fadderTypeDict.filter(fadder => type.includes(fadder.name)))

  }
console.log('singleFadder:', singleFadder);
console.log('fadderType:', singleFadder?.fadderType);
console.log('mapped fadderTypes:', singleFadder?.fadderType?.map(type => type.name));
console.log('final initial value:', singleFadder?.fadderType?.map(type => type.name) ?? []);

  return (
  <Stack>
    <Group>
      <Button disabled={!editFadder} onClick={() => stack.open("edit-single-fadder")}>Redigera fadder</Button>
      <Button disabled={!editTags} onClick={()=> stack.open("edit-multiple-fadder")}>Ändra taggar</Button>
      <Menu position="bottom-end">
        <Menu.Target>
          <Button rightSection={<IconShirt size= {17}/>}>Tröjstorlekar</Button>
        </Menu.Target>
        <Menu.Dropdown >
        {shirtSizes.map((sizes, index) => (<Menu.Item key={index}> {sizes}</Menu.Item>))}
        </Menu.Dropdown>
      </Menu>
      <Menu position="bottom-end">
        <Menu.Target>
          <Button rightSection={<IconCupOff size= {17}/>}>Alleriger</Button>
        </Menu.Target>
        <Menu.Dropdown >
        {allergies.map((allergy, index) => (<Menu.Item key={index + 10}>{allergy}</Menu.Item>))}
        </Menu.Dropdown>
      </Menu>
      <Menu position="bottom-end">
        <Menu.Target>
          <Button rightSection={<IconBookmark size= {17}/>}>Taggar</Button>
        </Menu.Target>
        <Menu.Dropdown >
        {fadderTypeDict.map((type, index) => (<Menu.Item  key={index + 20}>{type.name}</Menu.Item>))}
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
                    error={updatedFadder.firstName === ''}
                    onChange={(event) => setUpdatedFadder({...updatedFadder, 
                                                          firstName:event.currentTarget.value})}/>
        <TextInput  label={'Efternamn'}
                    error={updatedFadder.lastName === ''}
                    value={updatedFadder.lastName} 
                    onChange={(event) => setUpdatedFadder({...updatedFadder, 
                                                          lastName:event.currentTarget.value})}/>

        <TagsInput  label={'Tröjstorlek'}
                    defaultValue={[updatedFadder.shirtSize]} 
                    error = {updatedFadder.shirtSize.length < 0}
                    maxTags={1} data={shirtSizes}></TagsInput>
        <TextInput  label={'Email'}
                    value={updatedFadder.email} 
                    onChange={(event) => setUpdatedFadder({...updatedFadder, 
                                                            email:event.currentTarget.value})}/>
        <TextInput  label={'Telefon'}
                    value={updatedFadder.phone} 
                    onChange={(event) => setUpdatedPhone(event.currentTarget.value)}/>
        <MultiSelect 
                    label={'Taggar'}
                    defaultValue={defaultTags} 
                    data={fadderTypeDict.map(val => val.name)}
                    value={fadderTypes}
                    onChange={fadderUpdateType}/>
        <Group>
        <Button onClick={stack.closeAll}>Avbryt</Button>
        <Button 
              
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