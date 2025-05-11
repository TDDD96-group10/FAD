
import React, { useState } from 'react';
import { Button, Group, FileInput } from '@mantine/core';
import { callApi } from "../hooks/useApi";
import { apiClient } from "../api/ApiClient";




const ImportFadder : React.FC  = () =>{
    const defaultFile = new File([""], "empty.csv", { type: "application/csv" });
    const [file, setFile] = useState<File>(defaultFile);

     const { callApi: triggerApi } = callApi(() =>
            apiClient.portal.portalImportUsersCreate( {file:file})
          );
      

    return (
        <Group>
            <Button onClick={() => triggerApi()}>Importera faddrar</Button>
            <FileInput
                label="Fil (PDF)"
                placeholder="Välj en CSV fill"
                value={file}
                onChange={(value) => {
                if (value !== null) {
                    setFile(value);
                }
                }}
                mb="md"
                accept=".csv,text/csv"
            />
    </Group>
  );
    
}



export default ImportFadder