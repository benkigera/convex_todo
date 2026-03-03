import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import type { Doc } from "../../../../convex/_generated/dataModel";

type ListItemProps = {
  todo: Doc<"todos">;
  onToggle: (id: Doc<"todos">["_id"]) => Promise<void>;
  onRemove: (id: Doc<"todos">["_id"]) => Promise<void>;
};

export function ListItem({ todo, onToggle, onRemove }: ListItemProps) {
  return (
    <li className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <Checkbox.Root
          checked={todo.completed}
          onCheckedChange={() => void onToggle(todo._id)}
          className="flex h-5 w-5 items-center justify-center rounded border border-slate-400 bg-white data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
          aria-label="Toggle todo completion"
        >
          <Checkbox.Indicator>
            <CheckIcon className="h-4 w-4 text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <span
          className={
            todo.completed ? "text-slate-500 line-through" : "text-slate-900"
          }
        >
          {todo.text}
        </span>
      </div>
      <button
        type="button"
        onClick={() => void onRemove(todo._id)}
        className="rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-500"
      >
        Delete
      </button>
    </li>
  );
}
