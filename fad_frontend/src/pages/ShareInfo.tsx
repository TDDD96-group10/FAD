import { useState } from 'react';
import {
  Button,
  Flex,
  FileInput
}
  from '@mantine/core';

import '../styles/pages/ShareInfo.css'


const ShareInfo: React.FC = () => {
  // Skapar ett state som styr om den nya knappen ska visas
  const [showLinkInput, setShowLinkInput] = useState(false);

  // Funktion som triggas vid klick på "Dela information"-knappen
  const handleShareInfoClick = () => {
    setShowLinkInput(prev => !prev); // Växlar mellan true och false för att visa/dölja knappen
  };
  return (

    <Flex
      h="50vh"
      mih={50}
      bg="rgba(0, 0, 0, 0)"
      gap={80}
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"

    >
      <Button variant="light" color="blue" autoContrast size="xl" h={80} w={400} fz="2rem" >Senaste nytt</Button>
      <Button variant="light" color="blue" autoContrast size="xl" h={80} w={400} fz="2rem" onClick={handleShareInfoClick} >Dela information</Button>
      {showLinkInput &&
        (<FileInput variant="filled" size="md" label="Lägg till länk" description="Vänligen lägg till länken här" placeholder="Klistra in länk här"
          style={{
            position: 'fixed', top: '600px', left: '50%', transform: 'translateX(-50%)', width: '400px'
          }}
        />
        )}
    </Flex>
  );
};

export default ShareInfo;

//Fin färg på knapparna:)  <Button variant="filled" color="yellow" autoContrast size="xl" h={80} w={400} fz="2rem" bg="#F6E2B6">Lägg ut PDF</Button>