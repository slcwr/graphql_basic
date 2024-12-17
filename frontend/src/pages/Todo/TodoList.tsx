import React from "react";
import { useDeleteTodoMutation } from "../../generated/graphql";
import { useGetTodosQuery } from "../../generated/graphql";
import {
  Container,
  VStack,
  Text,
  List,
  ListItem,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const TodoList: React.FC = () => {
  const { data, loading } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  //ID型を使用する場合はフロントではstring型で定義する（シリアライズされるときにstringになる）
  const handleDelete = async (id: string) => {
    try {
      await deleteTodo({
        variables: { id },
        update: (cache) => {
          cache.modify({
            fields: {
              todos(existingTodos = [], { readField }) {
                return existingTodos.filter(
                  (todoRef: any) => id !== readField("id", todoRef)
                );
              },
            },
          });
        },
      });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Todo List
        </Text>
        
        {data?.todos && data.todos.length > 0 ? (
          <List spacing={3}>
            {data.todos.map((todo) => (
              <ListItem
                key={todo.id}
                p={4}
                bg="white"
                borderRadius="md"
                boxShadow="sm"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text>{todo.title}</Text>
                <IconButton
                  aria-label="Delete todo"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => handleDelete(todo.id)}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Text color="gray.500" textAlign="center">
            No todos found
          </Text>
        )}
      </VStack>
    </Container>
  );
  
  
}

export default TodoList;