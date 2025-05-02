

import { v4 as uuidv4 } from 'uuid';
import { fadderProps } from './types';

export const allData: fadderProps[] = [
  { id: uuidv4(), firstName: 'Alice', lastName: 'Andersson', shirtSize: 'S', allergies: 'laktos', fadderType: [{ name: 'Donna', color: 'pink' }, { name: 'klassfadder', color: 'green' }], email: 'alice@example.com', phone: '0701234567' },
  { id: uuidv4(), firstName: 'Bob', lastName: 'Berg', shirtSize: 'M', allergies: '', fadderType: [{ name: 'DG', color: 'yellow' }], email: 'bob@example.com', phone: '0702345678' },
  { id: uuidv4(), firstName: 'Charlie', lastName: 'Carlsson', shirtSize: 'L', allergies: 'gluten', fadderType: [{ name: 'häfvfadder', color: 'blue' }], email: 'charlie@example.com', phone: '0703456789' },
  { id: uuidv4(), firstName: 'Diana', lastName: 'Dahl', shirtSize: 'S', allergies: 'jordnötter', fadderType: [{ name: 'Donna', color: 'pink' }], email: 'diana@example.com', phone: '0704567890' },
  { id: uuidv4(), firstName: 'Ethan', lastName: 'Ek', shirtSize: 'M', allergies: 'soja', email: 'ethan@example.com', phone: '0705678901' },
  { id: uuidv4(), firstName: 'Fiona', lastName: 'Forsberg', shirtSize: 'M', allergies: 'gluten', fadderType: [{ name: 'Donna', color: 'pink' }, { name: 'häfvfadder', color: 'blue' }], email: 'fiona@example.com', phone: '0706789012' },
  { id: uuidv4(), firstName: 'George', lastName: 'Gustafsson', shirtSize: 'L', allergies: 'jordgubbar', fadderType: [{ name: 'häfvfadder', color: 'blue' }, { name: 'klassfadder', color: 'green' }], email: 'george@example.com', phone: '0707890123' },
  { id: uuidv4(), firstName: 'Hannah', lastName: 'Holm', shirtSize: 'S', allergies: '', fadderType: [{ name: 'klassfadder', color: 'green' }], email: 'hannah@example.com', phone: '0708901234' },
  { id: uuidv4(), firstName: 'Ian', lastName: 'Isaksson', shirtSize: 'M', allergies: 'laktos', fadderType: [{ name: 'DG', color: 'yellow' }, { name: 'klassfadder', color: 'green' }], email: 'ian@example.com', phone: '0709012345' },
  { id: uuidv4(), firstName: 'Julia', lastName: 'Jonsson', shirtSize: 'XS', allergies: 'nötter', fadderType: [{ name: 'häfvfadder', color: 'blue' }], email: 'julia@example.com', phone: '0700123456' },
  { id: uuidv4(), firstName: 'Kevin', lastName: 'Karlsson', shirtSize: 'L', allergies: '', fadderType: [{ name: 'DG', color: 'yellow' }], email: 'kevin@example.com', phone: '0701123456' },
  { id: uuidv4(), firstName: 'Laura', lastName: 'Lind', shirtSize: 'M', allergies: 'skaldjur', fadderType: [{ name: 'Donna', color: 'pink' }], email: 'laura@example.com', phone: '0701223456' },
  { id: uuidv4(), firstName: 'Mike', lastName: 'Malm', shirtSize: 'XL', allergies: '', fadderType: [{ name: 'klassfadder', color: 'green' }], email: 'mike@example.com', phone: '0701323456' },
  { id: uuidv4(), firstName: 'Nina', lastName: 'Nilsson', shirtSize: 'S', allergies: 'gluten', fadderType: [{ name: 'häfvfadder', color: 'blue' }, { name: 'klassfadder', color: 'green' }], email: 'nina@example.com', phone: '0701423456' },
  { id: uuidv4(), firstName: 'Oscar', lastName: 'Olsson', shirtSize: 'L', allergies: 'nötter', fadderType: [{ name: 'DG', color: 'yellow' }, { name: 'häfvfadder', color: 'blue' }], email: 'oscar@example.com', phone: '0701523456' },
  { id: uuidv4(), firstName: 'Paula', lastName: 'Pettersson', shirtSize: 'M', allergies: 'jordnötter', fadderType: [{ name: 'Donna', color: 'pink' }], email: 'paula@example.com', phone: '0701623456' },
  { id: uuidv4(), firstName: 'Quinn', lastName: 'Qvist', shirtSize: 'XL', allergies: 'soja', fadderType: [{ name: 'klassfadder', color: 'green' }, { name: 'häfvfadder', color: 'blue' }], email: 'quinn@example.com', phone: '0701723456' },
  { id: uuidv4(), firstName: 'Rita', lastName: 'Rydberg', shirtSize: 'S', allergies: '', fadderType: [{ name: 'Donna', color: 'pink' }], email: 'rita@example.com', phone: '0701823456' },
  { id: uuidv4(), firstName: 'Sam', lastName: 'Svensson', shirtSize: 'L', allergies: 'laktos', fadderType: [{ name: 'DG', color: 'yellow' }], email: 'sam@example.com', phone: '0701923456' },
  { id: uuidv4(), firstName: 'Tina', lastName: 'Törn', shirtSize: 'M', allergies: '', fadderType: [{ name: 'klassfadder', color: 'green' }], email: 'tina@example.com', phone: '0702023456' },
  { id: uuidv4(), firstName: 'Uma', lastName: 'Uggla', shirtSize: 'S', allergies: '', fadderType: [{ name: 'Donna', color: 'pink' }, { name: 'klassfadder', color: 'green' }], email: 'uma@example.com', phone: '0702123456' },
]