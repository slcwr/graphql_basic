import { useMutation,useQuery } from "@apollo/client";
import TodoQuery from "../../../graphql/queries/getTodoList.graphql";

const TodoList: React.FC = () => {
    const { data, loading } = useQuery(TodoQuery);
    const [ deleteTodo ] = useMutation(DELETE_TODO);
    const [ updateTodo ] = useMutation(UPDATE_TODO);

    if (loading) return <div>Loading...</div>
    return (
        <div>
            {data.todoList.map((todo) => (
                <div key={todo.id}>
                    <span>{todo.text}</span>
                    <button onclick={() => deleteTodo({ variables: { id: todo.id}})}>削除</button>
                </div>
            ))}
        </div>
    );
}