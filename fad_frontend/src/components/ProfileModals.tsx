import { Button, Checkbox, Group, Stack, TagsInput, TextInput } from "@mantine/core";
import { useState } from "react";

type profileProps =  {
  title: string;
  description: string | null;
  addedOptions?: string[];
  mandatory: boolean;
  showTags: boolean;
}


type profileModalProps = {
  saveNewProfile: (newProfile: profileProps) => void;
  deleteProfileField: () =>  void;
  changeWindow: (thisWindow: string) => void;
  exit: () => void;
  currentCase: string;
  prevTitle?: string;
  prevDescription?: string;
  shouldShowTags?: boolean;
  wasMandatory?: boolean;
  prevOptions?: string[];
  selectedProfile?: profileProps;
}

function ProfileModals({saveNewProfile, deleteProfileField, changeWindow, exit, currentCase, prevTitle, prevDescription, shouldShowTags, wasMandatory, prevOptions}: profileModalProps) {
  console.log(prevTitle)
  const [title, setTitle] = useState(prevTitle ?? '');
  const [description, setDescription] = useState(prevDescription ?? '');
  const [hasError, setError] = useState(false);
  const [showTags, setShowTags] = useState(shouldShowTags ?? false);
  const [customOptions, setCustomOptions] = useState<string[]>(prevOptions && prevOptions.length > 0 ? prevOptions : []);
  const [mandatory, setMandatory] = useState(wasMandatory ?? false);

  console.log("titlefältet är satt till = ", title)
  
  function saveProfile(){
    const hasTitle = !!title && title.trim() !== '';
    const hasAddedOptions = customOptions.length > 0;
    
    if(showTags && hasAddedOptions && hasTitle || hasTitle && !showTags){
      const newProfileField = {title: title, description: description, addedOptions: customOptions, mandatory:mandatory, showTags:showTags }
      saveNewProfile(newProfileField);
      resetStates();
    }
    else{
      setError(true);
    }
  }
  function close(){
    resetStates();
    exit();
  }

  function editProfile(){
    const hasTitle = !!title && title.trim() !== '';
    const hasAddedOptions = customOptions.length > 0;
    
    if(showTags && hasAddedOptions && hasTitle || hasTitle && !showTags){
      const newProfileField = {title: title, description: description, addedOptions: customOptions, mandatory:mandatory, showTags:showTags}
      saveNewProfile(newProfileField);
      resetStates();
    }
    else{
      setError(true);
    }
  }

  function resetStates(){
    setTitle('')
    setDescription('')
    setError(false);
    setCustomOptions([]);
    setMandatory(false);
  }

  function changeInputOption(inputOption: string){
    if (inputOption === 'freeText'){
      setShowTags(false);
      setCustomOptions([]);
    }
    else{
      setShowTags(true);
    }
  }
  console.log(currentCase)
  switch(currentCase){
    case ('create-profile-field'):
      return(
        <>
        <Stack>
          <TextInput label="Rubrik" variant="filled" value={title} error={hasError ? "Saknar titel" : ''} onChange={(event) => setTitle(event.currentTarget.value)}></TextInput>
          <TextInput label="Beskrivning" variant="filled" description= "Kan lämnas tomt" value={description} onChange={(event) => setDescription(event.currentTarget.value)}></TextInput>
          <Group>
            <Button onClick={() => setShowTags(false)}>Fritext</Button>
            <Button onClick = {() => setShowTags(true)}>Flervalsalternativ</Button>
            {showTags && <TagsInput variant="filled"
                                    value={customOptions} 
                                    onChange={setCustomOptions} 
                                    miw = {345} 
                                    error={ showTags && customOptions.length === 0 ? "Lägg till alternativ" : ''} />}
            <Checkbox label= "Obligatorisk att fylla i" onClick= {() => setMandatory(prev => !prev)}></Checkbox>
          </Group>
          <Group mt="lg" justify="space-between">
            <Button onClick={() => exit()} variant="default">Avbryt</Button>
            <Button color="red" onClick={() => saveProfile()}>Spara</Button>
          </Group>
        </Stack>
        </>
      )
      case('edit-profile-field'):
      return(
        <>
        <Stack>
          <TextInput label={"Tidigare rubrik: " + prevTitle!} variant="filled" value={title} error={hasError ? "Saknar titel" : ''} onChange={(event) => setTitle(event.currentTarget.value)}></TextInput>
          <TextInput label="Beskrivning" variant="filled" description= "Kan lämnas tomt" value={description} onChange={(event) => setDescription(event.currentTarget.value)}></TextInput>
          
          <Group>
            <Button onClick={()=> changeInputOption('freeText')}>Fritext</Button>
            <Button onClick = {() => changeInputOption('multipleChoice')}>Flervalsalternativ</Button>
            {(showTags) && <TagsInput variant="filled"
                                      value={customOptions} 
                                      onChange={setCustomOptions} 
                                      miw = {345} 
                                      error={showTags && customOptions.length === 0 ? "Lägg till alternativ" : ''} />}
            <Checkbox label= "Obligatorisk att fylla i" onClick= {() => setMandatory(prev => !prev)}></Checkbox>
          </Group>
          <Group mt="lg" justify="space-between">
            <Button onClick={close} variant="default">Spara</Button>
            <Button color="red" onClick={() => changeWindow('delete-profile-field')}>Radera</Button>
          </Group>
        </Stack>
        </>
      )
      case('delete-profile-field'):
      return(
        <>
         Är du säker på att du vill radera taggen? Den kommer att försvinna från alla platser där den
          används.
            <Group mt="lg" justify="space-between">
              <Button onClick={exit} variant="default">
                Avbryt
              </Button>
              <Button onClick ={deleteProfileField} color="red">
                Radera
              </Button>
            </Group>
        </>
      )
  }
};

export default ProfileModals;

