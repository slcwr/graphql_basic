import { useCreateTodoMutation } from "../../generated/graphql";
import { useState } from "react";
import {
  FormControl,
  Button,
  VStack,
  HStack,
  Heading,
} from "@chakra-ui/react";

const CreateTodo: React.FC = () => {
  const [createTodo] = useCreateTodoMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await createTodo({
        variables: {
          title: title,
          description: description,
        },
      });

      if (result.data) {
        console.log("Todo created:", result.data.createTodo);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <Heading size="lg" color="blue.500">
          TODO追加
        </Heading>
        <HStack spacing={4} align="flex-start">
          <FormControl>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトルを入力"
            />
          </FormControl>

          <FormControl>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="説明を入力"
            />
          </FormControl>
        </HStack>

        <Button type="submit" colorScheme="blue">
          作成
        </Button>
      </VStack>
    </form>
  );
};

export default CreateTodo;
