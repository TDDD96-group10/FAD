import React, { useState } from 'react';
import {
  Button,
  Title,
  Group,
  Text,
  Container,
} from '@mantine/core';
import FADheader from '../components/header';
import CreateFolderCard from '../components/CreateFolderCard';
import AddFileFormCard from '../components/AddFileFormCard';
import FolderListCard from '../components/FoldersListCard';
import FolderContentCard from '../components/FolderContentCard';


type FileEntry = {
  title: string;
  fileName: string;
  fileUrl: string;
};

const ShareInfoPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [folders, setFolders] = useState<string[]>([]);
  const [folderContents, setFolderContents] = useState<Record<string, FileEntry[]>>({});
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const [showFolderForm, setShowFolderForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const [activeFolder, setActiveFolder] = useState<string>("");
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
    if (activeFolder === folderName) setActiveFolder("");
  };

  const deleteFile = (folder: string, index: number) => {
    setFolderContents((prev) => {
      const updated = [...(prev[folder] || [])];
      updated.splice(index, 1);
      return { ...prev, [folder]: updated };
    });
  };


  return (
    <FADheader> 
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

      {showFolderForm &&  <CreateFolderCard />}

      {showForm && <AddFileFormCard />}

      {folders.length > 0 && <FolderListCard 
        folders={folders} 
        activeFolder={activeFolder} 
        setActiveFolder={setActiveFolder} 
        deleteFolder={deleteFolder}
        setEditFiles={setEditFiles}
        />}
      {activeFolder &&  <FolderContentCard activeFolder={activeFolder} folderContents={folderContents} deleteFile={deleteFile}/>}
    </Container>
    </FADheader> 
  );
};

export default ShareInfoPage;