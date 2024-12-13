import { Input } from "@chakra-ui/react";

const CreateTodo: React.FC = () => {
    const [ text, setText ] = useState('');
    const [ createTodo ] = useMutation(CREATE_TODO);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createTodo({ variables: { text }});
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input 
             value={text}
             onchange={(e) => setText(e.target.value)}
             placeholder="新しいTodoを入力"
            />
            <button type="submit">追加</button>
        </form>
    );
}