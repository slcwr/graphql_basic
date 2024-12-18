// components/TodoForm.tsx
import { useForm } from "react-hook-form";
import "../styles/Modal.css";

interface TodoFormInputs {
  title: string;
  description: string;
}

interface TodoFormProps {
  onSubmit: (data: TodoFormInputs) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormInputs>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="todo-form">
      <div className="form-group">
        <label htmlFor="title">タイトル</label>
        <input
          {...register("title", {
            required: "タイトルは必須です",
            maxLength: {
              value: 50,
              message: "タイトルは50文字以内で入力してください",
            },
          })}
          type="text"
          id="title"
          placeholder="タイトルを入力"
        />
        {errors.title && (
          <span className="error-message">{errors.title.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">説明</label>
        <input
          {...register("description", {
            maxLength: {
              value: 200,
              message: "説明は200文字以内で入力してください",
            },
          })}
          type="text"
          id="description"
          placeholder="説明を入力"
        />
        {errors.description && (
          <span className="error-message">{errors.description.message}</span>
        )}
      </div>

      <button type="submit" className="submit-button">
        作成
      </button>
    </form>
  );
};

// interface TodoFormProps {
//     formState: {
//       title: string;
//       description: string;
//     };
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     onSubmit: (e: React.FormEvent) => void;
//   }
  
//   export const TodoForm: React.FC<TodoFormProps> = ({ formState, onChange, onSubmit }) => (
//     <form onSubmit={onSubmit} className="todo-form">
//       <div className="form-group">
//         <label htmlFor="title">タイトル</label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={formState.title}
//           onChange={onChange}
//           placeholder="タイトルを入力"
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="description">説明</label>
//         <input
//           type="text"
//           id="description"
//           name="description"
//           value={formState.description}
//           onChange={onChange}
//           placeholder="説明を入力"
//         />
//       </div>
//       <button type="submit" className="submit-button">
//         作成
//       </button>
//     </form>
//   );
  
  
  