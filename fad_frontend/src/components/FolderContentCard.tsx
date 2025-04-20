import { useState } from 'react';
import {
  Paper,
  Group,
  Title,
  ActionIcon,
  Divider,
  List,
  Text,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

interface FileEntry {
  title: string;
  fileName: string;
  fileUrl: string;
}

interface FolderContentCardProps {
  activeFolder: string;
  folderContents: Record<string, FileEntry[]>;
  deleteFile: (folder: string, fileIndex: number) => void;
}

const FolderContentCard = ({
  activeFolder,
  folderContents,
  deleteFile,
}: FolderContentCardProps) => {
  const [editFiles, setEditFiles] = useState<boolean>(false);

  const files = folderContents[activeFolder] ?? [];

  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="apart">
        <Title order={5}>Innehåll i mapp: {activeFolder}</Title>
        <ActionIcon onClick={() => setEditFiles((prev: boolean) => !prev)}>
          <IconPencil size={18} />
        </ActionIcon>
      </Group>

      <Divider my="sm" />

      {files.length > 0 ? (
        <List spacing="xs">
          {files.map((entry, index) => (
            <List.Item
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <a
                href={entry.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                📄 {entry.title} ({entry.fileName})
              </a>

              {editFiles && (
                <ActionIcon
                  color="red"
                  onClick={() => deleteFile(activeFolder, index)}
                  style={{ marginLeft: '1rem' }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              )}
            </List.Item>
          ))}
        </List>
      ) : (
        <Text>Inga filer i denna mapp ännu.</Text>
      )}
    </Paper>
  );
};

export default FolderContentCard;
