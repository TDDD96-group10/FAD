import React, { useState } from 'react';
import {
  Button,
  TextInput,
  FileInput,
  Title,
  Select,
  Group,
  Text,
  List,
  ActionIcon,
  Container,
  Paper,
  Divider,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import '../styles/pages/ShareInfo.css';

type FileEntry = {
  title: string;
  fileName: string;
  fileUrl: string;
};

const ShareInfo: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [folders, setFolders] = useState<string[]>([]);
  const [folderContents, setFolderContents] = useState<Record<string, FileEntry[]>>({});
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const [showFolderForm, setShowFolderForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [editFolders, setEditFolders] = useState(false);
  const [editFiles, setEditFiles] = useState(false);

  const handleShareClick = () => setShowForm((prev) => !prev);
  const handleCreateFolderClick = () => setShowFolderForm((prev) => !prev);

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      alert('Ange ett namn för mappen.');
      return;
    }
    if (folders.includes(newFolderName)) {
      alert('En mapp med detta namn finns redan.');
      return;
    }

    setFolders((prev) => [...prev, newFolderName]);
    setFolderContents((prev) => ({ ...prev, [newFolderName]: [] }));
    setNewFolderName('');
    setShowFolderForm(false);
  };

  const handlePublish = () => {
    if (!title || !file || !selectedFolder) {
      alert('Fyll i titel, välj en fil och en mapp');
      return;
    }

    const fileUrl = URL.createObjectURL(file);

    const newEntry: FileEntry = {
      title,
      fileName: file.name,
      fileUrl,
    };

    setFolderContents((prev) => ({
      ...prev,
      [selectedFolder]: [...(prev[selectedFolder] || []), newEntry],
    }));

    alert(`Fil publicerad med titel: ${title} i mapp "${selectedFolder}"`);

    setTitle('');
    setFile(null);
    setSelectedFolder(null);
    setShowForm(false);
  };

  const deleteFolder = (folderName: string) => {
    if (!window.confirm(`Vill du ta bort mappen "${folderName}"?`)) return;
    setFolders((prev) => prev.filter((f) => f !== folderName));
    setFolderContents((prev) => {
      const updated = { ...prev };
      delete updated[folderName];
      return updated;
    });
    if (activeFolder === folderName) setActiveFolder(null);
  };

  const deleteFile = (folder: string, index: number) => {
    setFolderContents((prev) => {
      const updated = [...(prev[folder] || [])];
      updated.splice(index, 1);
      return { ...prev, [folder]: updated };
    });
  };

  //FIGURER: 📁📎 

  return (
    <Container size={800} my={40}>
      <Title ta="center" mb={10}>
        Dela Information
      </Title>
      <Text c="dimmed" ta="center" mb={20}>
        Här kan du skapa mappar och lägga till pdf'er för ditt fadderi
      </Text>

    <Group justify="center" mb="md">
      <Button variant="outline" color="blue" size="xl" onClick={handleShareClick}>
        Lägg ut pdf
      </Button>
      <Button variant="outline" color="blue" size="xl" onClick={handleCreateFolderClick}>
        Skapa ny mapp
      </Button>
    </Group>

      {showFolderForm && (
        <Paper withBorder p="md" radius="md" mb="md">
          <Title order={4} mb="xs">Skapa ny mapp</Title>
          <TextInput
            label="Mappnamn"
            placeholder="Ange mappens namn"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.currentTarget.value)}
            mb="md"
          />
          <Button onClick={handleCreateFolder} fullWidth>Skapa</Button>
        </Paper>
      )}

      {showForm && (
        <Paper withBorder p="md" radius="md" mb="md">
          <Title order={4} mb="xs">Ladda upp fil</Title>
          <TextInput
            label="Titel"
            placeholder="Ange titel"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            mb="md"
          />
          <FileInput
            label="Fil (PDF)"
            placeholder="Välj en PDF"
            value={file}
            onChange={setFile}
            mb="md"
            accept="application/pdf"
          />
         <Select
          label="Mapp"
          placeholder="Välj en mapp"
          data={[...folders, '➕ Skapa ny mapp...']}
          value={selectedFolder}
          onChange={(value) => {
            if (value === '➕ Skapa ny mapp...') {
              setShowFolderForm(true);  // öppna mappformuläret
            } else {
              setSelectedFolder(value);
            }
          }}
          mb="md"
        />
          <Button fullWidth onClick={handlePublish} color="blue">Publicera</Button>
        </Paper>
      )}

      {folders.length > 0 && (
        <Paper withBorder p="md" radius="md" mb="md">
          <Group justify="apart">
            <Title order={5} size="xl">Mappar</Title>
            <ActionIcon onClick={() => setEditFolders((prev) => !prev)}>
              <IconPencil size={18} />
            </ActionIcon>
          </Group>
          <Divider my="sm" />
          <List spacing="xs">
            {folders.map((folder) => (
              <List.Item key={folder} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                   style={{
                    cursor: 'pointer',
                    fontWeight: activeFolder === folder ? 'bold' : 'normal',
                    color: '#0077cc',
                    fontSize: '1.2rem',       
                    flex: 1,                   
                  }}
                  onClick={() => {
                    setActiveFolder(prev => (prev === folder ? null : folder));
                    setEditFiles(false);
                  }}
                >
                  📁 {folder}
                </span>
                {editFolders && (
                  <ActionIcon color="red" onClick={() => deleteFolder(folder)}
                  style={{ marginLeft: '1rem' }}>
                    <IconTrash size={16} />
                  </ActionIcon>
                )}
              </List.Item>
            ))}
          </List>
        </Paper>
      )}

      {activeFolder && (
        <Paper withBorder p="md" radius="md">
          <Group justify="apart">
            <Title order={5}>Innehåll i mapp: {activeFolder}</Title>
            <ActionIcon onClick={() => setEditFiles((prev) => !prev)}>
              <IconPencil size={18} />
            </ActionIcon>
          </Group>
          <Divider my="sm" />
          {folderContents[activeFolder]?.length > 0 ? (
            <List spacing="xs">
              {folderContents[activeFolder].map((entry, index) => (
                <List.Item key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <a
                    href={entry.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    📄 {entry.title} ({entry.fileName})
                  </a>
                  {editFiles && (
                    <ActionIcon color="red" onClick={() => deleteFile(activeFolder, index)}
                    style={{ marginLeft: '1rem' }}>
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
      )}
    </Container>
  );
};

export default ShareInfo;