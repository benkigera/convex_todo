import { FormEvent, useMemo, useState } from "react";
import type { Doc } from "../../../../convex/_generated/dataModel";
import { useTodoList } from "../api/useTodoList";
import { useTodoListMutations } from "../api/useTodoListMutations";
import { List } from "../component/List";

export function TodoListView() {
  const [text, setText] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const todos = useTodoList();
  const { createTodo, toggleTodo, removeTodo } = useTodoListMutations();
  const isLoading = todos === undefined;
  const canSubmit = useMemo(() => text.trim().length > 0, [text]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    try {
      await createTodo(text);
      setActionError(null);
      setText("");
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Failed to create todo.",
      );
    }
  };

  const onToggle = async (id: Doc<"todos">["_id"]) => {
    try {
      await toggleTodo(id);
      setActionError(null);
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Failed to toggle todo.",
      );
    }
  };

  const onRemove = async (id: Doc<"todos">["_id"]) => {
    try {
      await removeTodo(id);
      setActionError(null);
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Failed to remove todo.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Todo List</h1>
        <p className="mt-1 text-sm text-slate-600">
          Managed by the todo_list feature.
        </p>
        <form
          onSubmit={(event) => void onSubmit(event)}
          className="mt-5 flex gap-3"
        >
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Write a task"
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500"
          />
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Add
          </button>
        </form>

        {isLoading ? (
          <p className="mt-4 text-sm text-slate-500">Loading todos...</p>
        ) : null}
        {actionError ? (
          <p className="mt-4 text-sm text-rose-600">{actionError}</p>
        ) : null}
        <div className="mt-6">
          <List todos={todos ?? []} onToggle={onToggle} onRemove={onRemove} />
        </div>
      </section>
    </main>
  );
}
