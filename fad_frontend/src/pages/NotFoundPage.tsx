import { Container, Title, Text, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container size={560} style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <Title order={1} size="3rem" mb="md">
        404 - Sidan kunde inte hittas
      </Title>
      <Text size="lg" mb="xl">
        Sidan du försökte nå existerar inte eller har flyttats.
      </Text>
      <Group justify="center">
        <Button variant="light" color="gray" size="md" onClick={() => navigate('/')}>
          Gå till startsidan
        </Button>
      </Group>
    </Container>
  );
};

export default NotFoundPage;