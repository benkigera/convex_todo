import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export function useTodoList() {
  return useQuery(api.features.todo_list.queries.listTodos, {});
}
