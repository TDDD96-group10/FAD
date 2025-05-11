import { useState } from "react";
import {  Button, TextInput } from '@mantine/core';
import { callApi} from "../hooks/useApi";
import { apiClient } from "../api/ApiClient"

const AddFadder: React.FC = () => {
    const [liuId, setLiuId] = useState("")
    const { callApi: triggerApi} = callApi(() =>
          apiClient.portal.portalFadderCreate(liuId)
        );

    return (
        <>
            <Button onClick={() => triggerApi()}>Lägg till fadder</Button>
            <TextInput
            placeholder="Ange LiuId"
            value={liuId}
            onChange={(event) => setLiuId(event.currentTarget.value)}
            withAsterisk 
            />
        </>
    )
}



export default AddFadder