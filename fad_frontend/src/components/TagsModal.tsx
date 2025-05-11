import { Button, ColorPicker, Group, Stack, TextInput } from "@mantine/core";
import { useState } from "react";

type tagProps = {
  name: string;
  color: string;
}

type AddTagModalProps = {
  addTag: (tag: tagProps) => void;
  editTag: (tag: tagProps) => void;
  removeTag: () => void;
  exitWindow: () => void;
  changeWindow: (thisWindow: string) => void;
  currentCase:string;
  prevName?: string;
  prevColor?: string;
  tags: tagProps[];
}

function TagsModal({ addTag, editTag, removeTag, changeWindow, exitWindow, currentCase, prevName, prevColor, tags}: AddTagModalProps) {
  const tagColours = ['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14'];
  const [name, setName] = useState(prevName ?? '');
  const [color, setColor] = useState(prevColor ?? '');
  const [error, setError] = useState(false);


  function changeTag() {
    if(tags.some(tag => tag.name === name)){
      setError(true);
    }
    else{
      editTag({name:name, color:color!}) 
      setName('');
      setColor('');
    }
  }
  
  function reset(){
    setName('');
    setColor('');
    setError(false);
    exitWindow();
  }
  function window(string:string){
    changeWindow(string);
  }

  switch(currentCase){
    case ('create-tag'):
      return(
      <Stack >
        <TextInput value={name}  
          error= {error ? 'Får inte ha samma namn som annan tag' : ''} 
          onChange={(event) => setName(event.currentTarget.value)} />
          <ColorPicker onChange={setColor} size="xl" value = {color} format="hex" swatches={tagColours} />
        <Button 
          maw={320} 
          onClick={() =>tags.some(tag => tag.name === name.trim())
                     ? setError(true) : 
                        addTag({ name: name.trim(), color })}
          >Spara</Button>
      </Stack>)
    case('edit-tag'):
      return(
        <>
        <Stack>
        <TextInput 
          maw={320} 
          value={name} 
          label = {'Namn:'}
          onChange={(event) => setName(event.currentTarget.value)}
          error= {error ? 'Får inte ha samma namn som annan tag' : ''}
          
          />
        <ColorPicker size="xl" onChange={setColor} value = {color} format="hex" swatches={tagColours}/>
        </Stack>
        <Group mt="lg" justify="space-between">
          <Button onClick={changeTag} >
            Spara ändringar
          </Button>
          <Button onClick ={() => window('delete-tag')} color="red">
            Radera tag
          </Button>
        </Group>
        </>)
      case('delete-tag'):
      return(
        <>
          Är du säker på att du vill radera taggen? Den kommer att försvinna från alla platser där den
          används.
            <Group mt="lg" justify="space-between">
              <Button onClick={reset} variant="default">
                Avbryt
              </Button>
              <Button onClick ={removeTag} color="red">
                Radera
              </Button>
            </Group>
        </>
      )
  }
};

export default TagsModal;

