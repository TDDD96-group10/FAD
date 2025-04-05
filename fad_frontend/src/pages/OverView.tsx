import { useState, useMemo } from 'react';
import { Group, Select, Table, Text, Stack, ScrollArea, Button, Notification, Transition } from '@mantine/core';
import * as XLSX from 'xlsx';

const OverView = () => {
  const [sortBy, setSortBy] = useState('fadder');
  const [summaryType, setSummaryType] = useState('specialkost');
  const [showNotification, setShowNotification] = useState(false); // State for notification

  const sortOptions = [
    { value: 'fadder', label: 'Fadder' },
    { value: 'specialkost', label: 'Specialkost' },
    { value: 'tröjstorlek', label: 'Tröjstorlek' },
    { value: 'faddertyp', label: 'Faddertyp' },
  ];
  const summaryOptions = [
    { value: 'specialkost', label: 'Specialkost' },
    { value: 'tröjstorlek', label: 'Tröjstorlek' },
  ];

  const sampleData = [
    { fadder: 'Elliot', specialkost: 'Kött', tröjstorlek: 'M', faddertyp: 'Klassfadder' },
    { fadder: 'Rikard', specialkost: 'Fisk', tröjstorlek: 'L', faddertyp: 'Överfadder' },
    { fadder: 'Olle', specialkost: 'Nötter', tröjstorlek: 'S', faddertyp: 'Hävffadder' },
    { fadder: 'Valdemar', specialkost: '-', tröjstorlek: 'XL', faddertyp: 'Överhävffadder' },
    { fadder: 'Disa', specialkost: 'Fläsk', tröjstorlek: 'S', faddertyp: 'Klassfadder' },
    { fadder: 'Svante', specialkost: '-', tröjstorlek: 'L', faddertyp: 'Specialfadder' },
    { fadder: 'Lovisa', specialkost: 'Vegan', tröjstorlek: 'S', faddertyp: 'Fadder' },
    { fadder: 'Belmin', specialkost: 'Vegetarian', tröjstorlek: 'M', faddertyp: 'Fadder' },
  ];

  const shirtSizeOrder = ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const sizeOrderMap = new Map(shirtSizeOrder.map((size, index) => [size, index]));

  const sortedData = useMemo(() => {
    return [...sampleData].sort((a, b) => {
      if (sortBy === 'tröjstorlek') {
        const sizeA = sizeOrderMap.get(a.tröjstorlek) ?? -1;
        const sizeB = sizeOrderMap.get(b.tröjstorlek) ?? -1;
        return sizeA - sizeB;
      } else {
        return a[sortBy].localeCompare(b[sortBy]);
      }
    });
  }, [sortBy, sampleData]);

  const columns = ['fadder', 'specialkost', 'tröjstorlek', 'faddertyp'];

  const rows = sortedData.map((element, index) => (
    <Table.Tr key={`${element.fadder}-${index}`}>
      {columns.includes('fadder') && <Table.Td>{element.fadder}</Table.Td>}
      {columns.includes('specialkost') && <Table.Td>{element.specialkost}</Table.Td>}
      {columns.includes('tröjstorlek') && <Table.Td>{element.tröjstorlek}</Table.Td>}
      {columns.includes('faddertyp') && <Table.Td>{element.faddertyp}</Table.Td>}
    </Table.Tr>
  ));

  const shirtSizeCounts = sampleData.reduce((acc, curr) => {
    const size = curr.tröjstorlek;
    acc[size] = (acc[size] || 0) + 1;
    return acc;
  }, {});

  const sortedSizes = Object.keys(shirtSizeCounts).sort((a, b) => {
    const indexA = shirtSizeOrder.indexOf(a);
    const indexB = shirtSizeOrder.indexOf(b);
    return indexA - indexB;
  });

  const uniqueFaddertyp = [...new Set(sampleData.map(item => item.faddertyp))].sort();

  const countsBySizeAndType = sampleData.reduce((acc, curr) => {
    const size = curr.tröjstorlek;
    const type = curr.faddertyp;
    if (!acc[size]) {
      acc[size] = {};
    }
    acc[size][type] = (acc[size][type] || 0) + 1;
    return acc;
  }, {});

  const TröjstorlekSummaryTable = () => (
    <Stack spacing="xs">
      <Table
        horizontalSpacing="md"
        verticalSpacing="sm"
        striped
        highlightOnHover
        withTableBorder
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Storlek</Table.Th>
            {uniqueFaddertyp.map(type => (
              <Table.Th key={type}>{type}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedSizes.map(size => (
            <Table.Tr key={size}>
              <Table.Td>{size}</Table.Td>
              {uniqueFaddertyp.map(type => (
                <Table.Td key={type}>{countsBySizeAndType[size]?.[type] || 0}</Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );

  const SpecialkostSummaryTable = () => {
    const specialkostColumns = ['fadder', 'specialkost'];
    const specialkostRows = sortedData.map((element, index) => (
      <Table.Tr key={`${element.fadder}-${index}`}>
        {specialkostColumns.includes('fadder') && <Table.Td>{element.fadder}</Table.Td>}
        {specialkostColumns.includes('specialkost') && <Table.Td>{element.specialkost}</Table.Td>}
      </Table.Tr>
    ));

    return (
      <Stack spacing="xs">
        <Table
          style={{ minWidth: '600px' }}
          horizontalSpacing="md"
          verticalSpacing="sm"
          striped
          highlightOnHover
          withTableBorder
        >
          <Table.Thead>
            <Table.Tr>
              {specialkostColumns.includes('fadder') && <Table.Th>Fadder</Table.Th>}
              {specialkostColumns.includes('specialkost') && <Table.Th>Specialkost</Table.Th>}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {specialkostRows.length > 0 ? specialkostRows : (
              <Table.Tr>
                <Table.Td colSpan={2}>No data</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Stack>
    );
  };

  // Export function for Excel with notification
  const exportSummaryToExcel = () => {
    if (summaryType === 'tröjstorlek') {
      const headers = ['Storlek', ...uniqueFaddertyp];
      const data = sortedSizes.map(size => [
        size,
        ...uniqueFaddertyp.map(type => countsBySizeAndType[size]?.[type] || 0),
      ]);

      const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Tröjstorlek');
      XLSX.writeFile(wb, 'trojstorlek_summary.xlsx');
    } else {
      const headers = ['Fadder', 'Specialkost'];
      const data = sortedData.map(element => [element.fadder, element.specialkost]);

      const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Specialkost');
      XLSX.writeFile(wb, 'specialkost_summary.xlsx');
    }

    // Show notification and hide after 5 seconds
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <Stack>
      {/* Notification Pop-Up with Sliding Effect */}
      <Transition
        mounted={showNotification}
        transition="slide-left"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Notification
            title="Export klar!"
            color="green"
            onClose={() => setShowNotification(false)}
            style={{
              ...styles,
              position: 'fixed',
              bottom: 20,
              right: 20,
              zIndex: 9999,
              width: '400px',
              padding: '20px',
            }}
          >
            Sammanställningen har nu laddats ner!
          </Notification>
        )}
      </Transition>

      <Group>
        <Text>Sortera efter: </Text>
        <Select
          data={sortOptions}
          value={sortBy}
          onChange={(value) => {
            if (value) setSortBy(value);
          }}
        />
      </Group>

      <ScrollArea style={{ maxHeight: 400, overflow: 'auto' }} p="md">
        <Table
          style={{ minWidth: '600px' }}
          horizontalSpacing="md"
          verticalSpacing="sm"
          striped
          highlightOnHover
          withTableBorder
        >
          <Table.Thead>
            <Table.Tr>
              {columns.includes('fadder') && <Table.Th>Fadder</Table.Th>}
              {columns.includes('specialkost') && <Table.Th>Specialkost</Table.Th>}
              {columns.includes('tröjstorlek') && <Table.Th>Tröjstorlek</Table.Th>}
              {columns.includes('faddertyp') && <Table.Th>Faddertyp</Table.Th>}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? rows : (
              <Table.Tr>
                <Table.Td colSpan={4}>No data</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <Group>
        <Text>Visa sammanställning för: </Text>
        <Select
          data={summaryOptions}
          value={summaryType}
          onChange={(value) => {
            if (value) setSummaryType(value);
          }}
        />
        <Button variant="filled" onClick={exportSummaryToExcel}>
          Exportera
        </Button>
      </Group>

      <ScrollArea style={{ maxHeight: 400, overflow: 'auto' }} p="md">
        {summaryType === 'tröjstorlek' ? <TröjstorlekSummaryTable /> : <SpecialkostSummaryTable />}
      </ScrollArea>
    </Stack>
  );
};

export default OverView;