import { Modal, Stack, TextInput, Button } from '@mantine/core';
import { callApi } from "../hooks/useApi";
import { apiClient } from "../api/ApiClient";
import {PostLink} from "../api/Api";
import { useSmartState } from "../hooks/useSmartState";

type AddActivityModalProps = {
  opened: boolean;
  onClose: () => void;
};

const AddActivityModal = ({ opened, onClose }: AddActivityModalProps) => {
  const [post, setPost] = useSmartState<PostLink>({
      author: "defult",
      program: 1,
      send_notifcation: false,
      title: "",
      text: "",
      link:""

    });
  
    const { callApi: triggerApi, error:error} = callApi(() =>
      apiClient.portal.portalPostLinkCreate(post)
    );

 
  const handleAdd = () => {
    
    triggerApi()
  
    //onClose(); 
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Lägg till event"  >
  
            <Stack>
              <TextInput label="Titel" placeholder="Titel" onChange={(event) =>  setPost("title",event.currentTarget.value)}/>
              <TextInput label="Beskrivning" placeholder="Beskrivning" onChange={(event) => setPost("text",event.currentTarget.value)}/>
              <TextInput label="Länk till det kuliga" placeholder="Länk" onChange={(event) => setPost("link",event.currentTarget.value)}/>
              <Button
              variant={post.send_notifcation ? "filled" : "outline"}
              color={post.send_notifcation ? "green" : "gray"}
              onClick={() => setPost("send_notifcation", !post.send_notifcation)}
            >
              {post.send_notifcation ? "Skicka notifikation: Ja" : "Skicka notifikation: Nej"}
            </Button>
              <Button variant="default" onClick={handleAdd}>Publicera</Button>
            </Stack>
          </Modal>
  );
};

export default AddActivityModal;
