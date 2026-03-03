import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

export function useTodoListMutations() {
  const createTodo = useMutation(
    api.features.todo_list.mutations.createTodo,
  );
  const toggleTodo = useMutation(
    api.features.todo_list.mutations.toggleTodoCompletion,
  );
  const removeTodo = useMutation(
    api.features.todo_list.mutations.removeTodo,
  );

  return {
    createTodo: (text: string) => createTodo({ text }),
    toggleTodo: (id: Id<"todos">) => toggleTodo({ id }),
    removeTodo: (id: Id<"todos">) => removeTodo({ id }),
  };
}
