import { useMutation } from "@apollo/client";

const TodoList: React.FC = () => {
    const { data, loading } = useQuery(GET_TODOS);
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