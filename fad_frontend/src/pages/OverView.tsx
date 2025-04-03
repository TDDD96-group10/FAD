import { useState, useMemo } from 'react';
import { Group, Select, Table, Text, Stack, ScrollArea } from '@mantine/core';

const OverView = () => {
  const [sortBy, setSortBy] = useState('fadder');

  // Sorting options for the dropdown
  const sortOptions = [
    { value: 'fadder', label: 'Fadder' },
    { value: 'specialkost', label: 'Specialkost' },
    { value: 'tröjstorlek', label: 'Tröjstorlek' },
  ];

  // Sample data
  const sampleData = [
    { fadder: 'Elliot', specialkost: 'Kött', tröjstorlek: 'M' },
    { fadder: 'Rikard', specialkost: 'Fisk', tröjstorlek: 'L' },
    { fadder: 'Olle', specialkost: 'Nötter', tröjstorlek: 'S' },
    { fadder: 'Valdemar', specialkost: '-', tröjstorlek: 'XL' },
    { fadder: 'Disa', specialkost: 'Fläsk', tröjstorlek: 'S' },
    { fadder: 'Svante', specialkost: '-', tröjstorlek: 'L' },
    { fadder: 'Lovisa', specialkost: 'Vegan', tröjstorlek: 'S' },
    { fadder: 'Belmin', specialkost: 'Vegetarian', tröjstorlek: 'M' },
    { fadder: 'Elliot', specialkost: 'Kött', tröjstorlek: 'M' },
    { fadder: 'Rikard', specialkost: 'Fisk', tröjstorlek: 'L' },
    { fadder: 'Olle', specialkost: 'Nötter', tröjstorlek: 'S' },
    { fadder: 'Valdemar', specialkost: '-', tröjstorlek: 'XL' },
    { fadder: 'Disa', specialkost: 'Fläsk', tröjstorlek: 'S' },
    { fadder: 'Svante', specialkost: '-', tröjstorlek: 'L' },
    { fadder: 'Lovisa', specialkost: 'Vegan', tröjstorlek: 'S' },
    { fadder: 'Belmin', specialkost: 'Vegetarian', tröjstorlek: 'M' },
    { fadder: 'Elliot', specialkost: 'Kött', tröjstorlek: 'M' },
    { fadder: 'Rikard', specialkost: 'Fisk', tröjstorlek: 'L' },
    { fadder: 'Olle', specialkost: 'Nötter', tröjstorlek: 'S' },
    { fadder: 'Valdemar', specialkost: '-', tröjstorlek: 'XXXL' },
    { fadder: 'Disa', specialkost: 'Fläsk', tröjstorlek: 'XXL' },
    { fadder: 'Svante', specialkost: '-', tröjstorlek: 'XL' },
    { fadder: 'Lovisa', specialkost: 'Vegan', tröjstorlek: 'SS' },
    { fadder: 'Belmin', specialkost: 'Vegetarian', tröjstorlek: 'XXS' },
  ];

  // Define the correct order of shirt sizes
  const shirtSizeOrder = ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  // Create a map for quick lookup of size order
  const sizeOrderMap = new Map(shirtSizeOrder.map((size, index) => [size, index]));

  // Memoize the sorted data based on the selected sort column
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

  // Define table columns
  const columns = ['fadder', 'specialkost', 'tröjstorlek'];

  // Generate table rows for main table
  const rows = sortedData.map((element, index) => (
    <Table.Tr key={`${element.fadder}-${index}`}>
      {columns.includes('fadder') && <Table.Td>{element.fadder}</Table.Td>}
      {columns.includes('specialkost') && <Table.Td>{element.specialkost}</Table.Td>}
      {columns.includes('tröjstorlek') && <Table.Td>{element.tröjstorlek}</Table.Td>}
    </Table.Tr>
  ));

  // Compute shirt size counts
  const shirtSizeCounts = sampleData.reduce((acc, curr) => {
    const size = curr.tröjstorlek;
    acc[size] = (acc[size] || 0) + 1;
    return acc;
  }, {});

  // Sort the sizes based on shirtSizeOrder
  const sortedSizes = Object.keys(shirtSizeCounts).sort((a, b) => {
    const indexA = shirtSizeOrder.indexOf(a);
    const indexB = shirtSizeOrder.indexOf(b);
    return indexA - indexB;
  });


  const fadderSummaryTable = () => (
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
              <Table.Th>Size</Table.Th>
              <Table.Th>Count</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sortedSizes.map((size) => (
              <Table.Tr key={size}>
                <Table.Td>{size}</Table.Td>
                <Table.Td>{shirtSizeCounts[size]}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
  );

  return (
    <Stack>
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
      
      <ScrollArea style={{ maxHeight: 400, overflow: 'auto' }}>
        <Table
          style={{ minWidth: '600px' }} // Set minimum width for horizontal scrolling
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
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? rows : (
              <Table.Tr>
                <Table.Td colSpan={3}>No data</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
        {/* Call the extracted function/component for the first table */}
      <Text>Sammanställning</Text>
      {/* Call the extracted function/component for the second table */}
      <ScrollArea style={{ maxHeight: 400, overflow: 'auto' }}>
        {fadderSummaryTable()}
      </ScrollArea>
    </Stack>
  );
}

export default OverView;
