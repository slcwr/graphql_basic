import React from "react";
import { useDeleteTodoMutation } from "../../generated/graphql";
import { useUpdateTodoMutation } from "../../generated/graphql";
import { useGetTodosQuery } from "../../generated/graphql";
import { gql } from "@apollo/client";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { DragHandleIcon } from "@chakra-ui/icons";
import { useCreateTodoModal } from "../../hooks/useCreateTodoModal";

import {
  Container,
  VStack,
  Text,
  List,
  ListItem,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  Box,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";

const TodoList: React.FC = () => {
  const { Modal, onOpen } = useCreateTodoModal();
  const { data, loading } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
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

  const handleEdit = async (newTitle: string, id: string) => {
    try {
      await updateTodo({
        variables: {
          id,
          updateTodoInput: {
            title: newTitle,
          },
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              todos(existingTodos = [], { readField }) {
                return existingTodos.map((todoRef: any) => {
                  if (id === readField("id", todoRef)) {
                    return cache.writeFragment({
                      id: cache.identify(todoRef),
                      fragment: gql`
                        fragment UpdatedTodo on Todo {
                          title
                        }
                      `,
                      data: {
                        title: newTitle,
                      },
                    });
                  }
                  return todoRef;
                });
              },
            },
          });
        },
      });
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination || !data?.todos) return;

    const items = Array.from(data.todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4} align="stretch">
        <Flex justify="center" align="center">
          <Text fontSize="3xl" fontWeight="bold">
            Todo List
          </Text>
        </Flex>

        {data?.todos && data.todos.length > 0 ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <List
                  spacing={3}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {data.todos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          p={4}
                          bg="white"
                          borderRadius="md"
                          boxShadow="sm"
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box {...provided.dragHandleProps} mr={2}>
                            <DragHandleIcon />
                          </Box>
                          <Editable
                            defaultValue={todo.title}
                            onSubmit={(newTitle) =>
                              handleEdit(newTitle, todo.id)
                            }
                            isPreviewFocusable={true}
                            submitOnBlur={true}
                          >
                            <EditablePreview cursor="text" />
                            <EditableInput />
                          </Editable>
                          <IconButton
                            aria-label="Delete todo"
                            icon={<DeleteIcon />}
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleDelete(todo.id)}
                          />
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <Text color="gray.500" textAlign="center">
            No todos found
          </Text>
        )}
        <Modal />
        <IconButton
          aria-label="Add todo"
          icon={<AddIcon />}
          onClick={onOpen}
          colorScheme="blue"
        />
      </VStack>
    </Container>
  );
};

export default TodoList;
