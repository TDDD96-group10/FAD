import { useState, useMemo } from 'react';
import { Group, Select, Table, Text, Stack, ScrollArea, Button, Notification, Transition } from '@mantine/core';
import * as XLSX from 'xlsx';

// Define interface for select options
interface Option {
  value: string;
  label: string;
}

// Define interface for data items
interface DataItem {
  fadder: string;
  specialkost: string;
  tröjstorlek: string;
  faddertyp: string;
}

const OverViewPage = () => {
  // State with explicit types
  const [sortBy, setSortBy] = useState<keyof DataItem>('fadder');
  const [summaryType, setSummaryType] = useState<'specialkost' | 'tröjstorlek'>('specialkost');
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // Sort options with type
  const sortOptions: Option[] = [
    { value: 'fadder', label: 'Fadder' },
    { value: 'specialkost', label: 'Specialkost' },
    { value: 'tröjstorlek', label: 'Tröjstorlek' },
    { value: 'faddertyp', label: 'Faddertyp' },
  ];

  // Summary options with type
  const summaryOptions: Option[] = [
    { value: 'specialkost', label: 'Specialkost' },
    { value: 'tröjstorlek', label: 'Tröjstorlek' },
  ];

  // Sample data with type
  const sampleData: DataItem[] = [
    { fadder: 'Elliot', specialkost: 'Kött', tröjstorlek: 'M', faddertyp: 'Klassfadder' },
    { fadder: 'Rikard', specialkost: 'Fisk', tröjstorlek: 'L', faddertyp: 'Överfadder' },
    { fadder: 'Olle', specialkost: 'Nötter', tröjstorlek: 'S', faddertyp: 'häfvfadder' },
    { fadder: 'Valdemar', specialkost: '-', tröjstorlek: 'XL', faddertyp: 'Överhäfvfadder' },
    { fadder: 'Disa', specialkost: 'Fläsk', tröjstorlek: 'S', faddertyp: 'Klassfadder' },
    { fadder: 'Svante', specialkost: '-', tröjstorlek: 'L', faddertyp: 'Specialfadder' },
    { fadder: 'Lovisa', specialkost: 'Vegan', tröjstorlek: 'S', faddertyp: 'Fadder' },
    { fadder: 'Belmin', specialkost: 'Vegetarian', tröjstorlek: 'M', faddertyp: 'Fadder' },
    { fadder: 'Elliot', specialkost: 'Kött', tröjstorlek: 'XXS', faddertyp: 'Klassfadder' },
    { fadder: 'Rikard', specialkost: 'Fisk', tröjstorlek: 'XL', faddertyp: 'Överfadder' },
    { fadder: 'Olle', specialkost: 'Nötter', tröjstorlek: 'S', faddertyp: 'häfvfadder' },
    { fadder: 'Valdemar', specialkost: '-', tröjstorlek: 'XXL', faddertyp: 'Överhäfvfadder' },
    { fadder: 'Disa', specialkost: 'Fläsk', tröjstorlek: 'XXS', faddertyp: 'Klassfadder' },
    { fadder: 'Svante', specialkost: '-', tröjstorlek: 'XL', faddertyp: 'Specialfadder' },
    { fadder: 'Lovisa', specialkost: 'Vegan', tröjstorlek: 'S', faddertyp: 'Fadder' },
    { fadder: 'Belmin', specialkost: 'Vegetarian', tröjstorlek: 'M', faddertyp: 'Fadder' },
    { fadder: 'Elliot', specialkost: 'Kött', tröjstorlek: 'M', faddertyp: 'Klassfadder' },
    { fadder: 'Rikard', specialkost: 'Fisk', tröjstorlek: 'XL', faddertyp: 'Överfadder' },
    { fadder: 'Olle', specialkost: 'Nötter', tröjstorlek: 'S', faddertyp: 'häfvfadder' },
    { fadder: 'Valdemar', specialkost: '-', tröjstorlek: 'XXL', faddertyp: 'Överhäfvfadder' },
    { fadder: 'Disa', specialkost: 'Fläsk', tröjstorlek: 'XS', faddertyp: 'Klassfadder' },
    { fadder: 'Svante', specialkost: '-', tröjstorlek: 'L', faddertyp: 'Specialfadder' },
    { fadder: 'Lovisa', specialkost: 'Vegan', tröjstorlek: 'XXS', faddertyp: 'Fadder' },
    { fadder: 'Belmin', specialkost: 'Vegetarian', tröjstorlek: 'XXXL', faddertyp: 'Fadder' },
  ];

  // Shirt size order with type
  const shirtSizeOrder: string[] = ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const sizeOrderMap = new Map<string, number>(shirtSizeOrder.map((size, index) => [size, index]));

  // Memoized sorted data with type inferred as DataItem[]
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

  // Columns with type
  const columns: (keyof DataItem)[] = ['fadder', 'specialkost', 'tröjstorlek', 'faddertyp'];

  // Table rows
  const rows = sortedData.map((element, index) => (
    <Table.Tr key={`${element.fadder}-${index}`}>
      {columns.includes('fadder') && <Table.Td>{element.fadder}</Table.Td>}
      {columns.includes('specialkost') && <Table.Td>{element.specialkost}</Table.Td>}
      {columns.includes('tröjstorlek') && <Table.Td>{element.tröjstorlek}</Table.Td>}
      {columns.includes('faddertyp') && <Table.Td>{element.faddertyp}</Table.Td>}
    </Table.Tr>
  ));

  // Shirt size counts with explicit type
  const shirtSizeCounts: Record<string, number> = sampleData.reduce((acc, curr) => {
    const size = curr.tröjstorlek;
    acc[size] = (acc[size] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sorted sizes with type inferred as string[]
  const sortedSizes = Object.keys(shirtSizeCounts).sort((a, b) => {
    const indexA = shirtSizeOrder.indexOf(a);
    const indexB = shirtSizeOrder.indexOf(b);
    return indexA - indexB;
  });

  // Unique faddertyp with type
  const uniqueFaddertyp: string[] = [...new Set(sampleData.map(item => item.faddertyp))].sort();

  // Counts by size and type with explicit type
  const countsBySizeAndType: Record<string, Record<string, number>> = sampleData.reduce((acc, curr) => {
    const size = curr.tröjstorlek;
    const type = curr.faddertyp;
    if (!acc[size]) {
      acc[size] = {};
    }
    acc[size][type] = (acc[size][type] || 0) + 1;
    return acc;
  }, {} as Record<string, Record<string, number>>);

  // Tröjstorlek summary table component
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

  // Specialkost summary table component
  const SpecialkostSummaryTable = () => {
    const specialkostColumns = ['fadder', 'specialkost'] as const;
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

  // Export function for Excel
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

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  return (
    <Stack>
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
            if (value) setSortBy(value as keyof DataItem);
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
            if (value) setSummaryType(value as 'specialkost' | 'tröjstorlek');
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

export default OverViewPage;