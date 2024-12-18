// hooks/useCreateTodoModal.tsx
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useCreateTodoMutation } from "../generated/graphql";
import "../styles/Modal.css";
import { gql } from "@apollo/client";
import { TodoForm } from "../components/todoForm";

interface TodoFormInputs {
  title: string;
  description: string;
}

export const useCreateTodoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createTodo] = useCreateTodoMutation();

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback(
    async (data: TodoFormInputs) => {
      try {
        await createTodo({
          variables: {
            title: data.title,
            description: data.description,
          },
          update: (cache, { data }) => {
            cache.modify({
              fields: {
                todos(existingTodos = []) {
                  const newTodoRef = cache.writeFragment({
                    data: data?.createTodo,
                    fragment: gql`
                      fragment NewTodo on Todo {
                        id
                        title
                        description
                      }
                    `,
                  });
                  return [...existingTodos, newTodoRef];
                },
              },
            });
          },
        });
        onClose();
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    },
    [createTodo, onClose]
  );

  const Modal = useCallback(() => {
    if (!isOpen) return null;

    return createPortal(
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Todo追加</h2>
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <TodoForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>,
      document.body
    );
  }, [isOpen, onClose, handleSubmit]);
  return { Modal, onOpen };
};
