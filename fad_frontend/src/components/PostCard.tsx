import { PostSerializer } from '../api/Api';
import { Card, Text, Group} from '@mantine/core';
import { useNavigate } from 'react-router-dom';


const PostCard: React.FC<{ post: PostSerializer }> = ({ post }) => {
    const navigate = useNavigate(); 
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder w={400} h={200} onClick={() => navigate(`post/${post.id}`)}>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{post.title}</Text>
        </Group>
        <Text size="sm" c="dimmed">
          {post.text}
        </Text>
      </Card>
    );
  };


export default PostCard;