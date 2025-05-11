
import React from 'react';
import {Button, Group, Menu } from "@mantine/core";

interface TageMangerProps {
    tags_costum?: Record<string, string[]>,
    tags?: string[],
    setUrlParameter: (value: string) => void;
  }
  
const TageManger: React.FC<TageMangerProps>  = ({ tags_costum,tags,setUrlParameter }) =>{
    return ( 
    <Group>
           {Object.entries(tags_costum ?? {}).map(([key, values]) => {
           return <Menu position="bottom-end">
                    <Menu.Target>
                      <Button>{key}</Button>
                    </Menu.Target>
                    <Menu.Dropdown >
                    {values.map((value, index) => (<Menu.Item key={index} onClick={() => setUrlParameter(`tags_custom=${value}=${key}`)}> {value}</Menu.Item>))}
                    </Menu.Dropdown>
                  </Menu>
           })}
           <Menu position="bottom-end">
                   <Menu.Target>
                     <Button >Taggar</Button>
                   </Menu.Target>
                   <Menu.Dropdown >
                   {tags?.map((value, index) => (<Menu.Item key={index} onClick={() => setUrlParameter(`tags=${value}`)}>{value}</Menu.Item>))}
                   </Menu.Dropdown>
                 </Menu>
           
    </Group>
)
       
}


export default TageManger;
