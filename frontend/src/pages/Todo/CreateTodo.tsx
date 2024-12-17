import { useCreateTodoMutation } from "../../generated/graphql";
import { useState } from "react";

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
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル"
      />
      <input
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="説明"
      />
      <button type="submit">作成</button>
    </form>
  );
};

export default CreateTodo;
