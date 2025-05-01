import {Button, Group, Menu, Modal, MultiSelect, Stack, TagsInput, TextInput, useModalsStack } from "@mantine/core";
import { IconBookmark, IconCupOff, IconShirt } from "@tabler/icons-react";
import { useState } from "react";
import { fadderProps, searchBarProps, fadderType } from "../pages/types";
import React from "react";



const SearchBar: React.FC<searchBarProps> = ({ editTags, selectedFaddrar, editFadder, updateMultipleTags, singleFadder, updateFadder}) => {
  
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

  const uniqueTags = React.useMemo(() => {
    return Array.from(
      new Set(
        selectedFaddrar
          .flatMap((fadder) => fadder.fadderType?.map((type) => type.name) ?? [])
          .filter((name): name is string => typeof name === 'string')
      )
    );
  }, [selectedFaddrar]);


  const [removableTags, setRemovableTags] = useState<string[]>(() => uniqueTags);
  const [addedTags, setAddedTags] = useState<string[]>([]);
  
  React.useEffect(() => {
    const currentFadder = singleFadder || defaultFadder;
    setUpdatedFadder(currentFadder);
    setShirtSize(currentFadder.shirtSize ? [currentFadder.shirtSize] : ['']);
    setfadderType(currentFadder.fadderType?.map(ft => ft.name) ?? []);
  }, [singleFadder]);

  //This updates the selected faddrar when added/removed
  React.useEffect( () =>{
    const allTagsSelected = selectedFaddrar
    .flatMap((fadder) => fadder.fadderType?.map((type) => type.name) ?? [])
    .filter((name): name is string => typeof name === 'string');
    const uniqueTags = Array.from(new Set(allTagsSelected));
    console.log("UNIKA TAGGAR I USEEFFECT ", uniqueTags)
    setRemovableTags(uniqueTags)
    setAddedTags([])
    selectedFaddrarRef.current = selectedFaddrar;
  }, [selectedFaddrar])

  function removeMultipleTags() {
    const tagsToRemove = uniqueTags.filter(item => !removableTags.includes(item));
    const updatedFaddrar = selectedFaddrar.map(fadder => ({
      ...fadder,
      fadderType: fadder.fadderType
        ? fadder.fadderType.filter(type => !tagsToRemove.includes(type.name))
        : undefined,
    }));
  
    updateMultipleTags(updatedFaddrar);
    // Immediately reflect local state instead of waiting for useEffect
    setRemovableTags(
      Array.from(new Set(
        updatedFaddrar.flatMap(f =>
          f.fadderType?.map(t => t.name) ?? []
        )
      ))
    );
    setAddedTags([]);
  }
const selectedFaddrarRef = React.useRef(selectedFaddrar);
  
function addMultipleTags(){
  const updatedFaddrar = selectedFaddrarRef.current.map(fadder => {
    const existingTagNames = fadder.fadderType?.map(type => type.name) ?? [];
    const newTypes: fadderType[] = addedTags
      .filter(tag => !existingTagNames.includes(tag))
      .map(tag => {
        const foundType = fadderTypeDict.find(ft => ft.name === tag);
        return foundType ?? { name: tag, color: 'gray' };
      });
    return {
      ...fadder,
      fadderType: [...(fadder.fadderType ?? []), ...newTypes]
    };
  });

  updateMultipleTags(updatedFaddrar);
  setRemovableTags(prev => [
    ...prev,
    ...addedTags.filter(tag => !prev.includes(tag))
  ]);
  setAddedTags([]);
}

  
  function setFilter(allergy: string): void {
    throw new Error("Function not implemented.");
  }
  const allTags = fadderTypeDict.map(val => val.name)

 

  return (
  <Stack>
    {selectedFaddrar.map((val, index) => <p key={index + 100000}> {val.firstName}</p>)}
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
                      setUpdatedFadder((prev) => ({ ...prev, shirtSize: val[0] || '' }));}}
                    data={shirtSizes}
                    error={shirtSize.length !== 1}
                  
                    />
        <TextInput  label={'Email'}
                    value={updatedFadder.email} 
                    onChange={(event) => setUpdatedFadder((prev) => ({
                      ...prev, email: event.currentTarget.value}))}/>
        <TextInput  label={'Telefon'}
                    value={updatedFadder.phone} 
                    onChange={(event) => setUpdatedFadder((prev) => ({
                      ...prev, phone: event.currentTarget.value}))}/>
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
                                stack.closeAll();}}
            >Spara</Button>
        </Group>
      </Modal>
      <Modal {...stack.register('edit-multiple-fadder')}>
      <TagsInput
                label={'Ta bort taggar från alla markerade'}
                value={removableTags}
                onChange={setRemovableTags}
                />
      <Button onClick={()=> {removeMultipleTags();
                            stack.closeAll();
                            }}>Spara ändring</Button>
      <TagsInput
                label={'Lägg till denna tag till alla markerade'}
                value={addedTags}
                onChange={setAddedTags}
                data = {allTags}
              />
        <Group >
          <Button onClick={()=> {
                                addMultipleTags(); 
                                stack.closeAll();}}>Spara ändring</Button>
        </Group>
      </Modal>
    </Modal.Stack>
  </Stack>
  );
};

export default SearchBar;