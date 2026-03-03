import type { Doc } from "../../../../convex/_generated/dataModel";
import { EmptyState } from "./EmptyState";
import { ListItem } from "./ListItem";

type ListProps = {
  todos: Doc<"todos">[];
  onToggle: (id: Doc<"todos">["_id"]) => Promise<void>;
  onRemove: (id: Doc<"todos">["_id"]) => Promise<void>;
};

export function List({ todos, onToggle, onRemove }: ListProps) {
  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <ListItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
