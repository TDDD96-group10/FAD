import { useState } from 'react';
import {
  Paper,
  Group,
  Title,
  ActionIcon,
  Divider,
  List,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

interface FolderListCardProps {
  folders: string[];
  activeFolder: string;
  setActiveFolder: (folder: string) => void;
  deleteFolder: (folder: string) => void;
  setEditFiles: (value: boolean) => void;
}

const FolderListCard = ({
  folders,
  activeFolder,
  setActiveFolder,
  deleteFolder,
  setEditFiles,
}: FolderListCardProps) => {
  // ✅ Add explicit type to fix "prev implicitly has any" warning
  const [editFolders, setEditFolders] = useState<boolean>(false);

  return (
    <Paper withBorder p="md" radius="md" mb="md">
      <Group justify="apart">
        <Title order={5} size="xl">Mappar</Title>
        <ActionIcon onClick={() => setEditFolders((prev: boolean) => !prev)}>
          <IconPencil size={18} />
        </ActionIcon>
      </Group>

      <Divider my="sm" />

      <List spacing="xs">
        {folders.map((folder) => (
          <List.Item
            key={folder}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                cursor: 'pointer',
                fontWeight: activeFolder === folder ? 'bold' : 'normal',
                color: '#0077cc',
                fontSize: '1.2rem',
                flex: 1,
              }}
              onClick={() => {
                // ✅ Fix: handle toggling active folder properly
                setActiveFolder(activeFolder === folder ? "" : folder);
                setEditFiles(false);
              }}
            >
              📁 {folder}
            </span>

            {editFolders && (
              <ActionIcon
                color="red"
                onClick={() => deleteFolder(folder)}
                style={{ marginLeft: '1rem' }}
              >
                <IconTrash size={16} />
              </ActionIcon>
            )}
          </List.Item>
        ))}
      </List>
    </Paper>
  );
};

export default FolderListCard;
