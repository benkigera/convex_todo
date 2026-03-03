# todo_list feature

## Folder structure

```
src/features/todo_list/
├── api/                  # Convex hooks (useQuery / useMutation wrappers)
│   ├── useTodoList.ts
│   └── useTodoListMutations.ts
├── component/            # Presentational components
│   ├── EmptyState.tsx
│   ├── List.tsx
│   └── ListItem.tsx
└── page/                 # Page-level entry component
    └── TodoListView.tsx

convex/features/todo_list/
├── queries.ts            # Convex query (listTodos)
├── mutations.ts          # Convex mutations (create, toggle, remove)
├── schema.ts             # Table definition
├── index.ts              # Barrel export
└── tests/
    └── contracts.test.ts
```

## Type flow

All types are auto-inferred from the Convex schema — no manual type definitions needed:

```
schema.ts → Doc<"todos"> (generated) → query returns Doc<"todos">[]
→ useQuery infers Doc<"todos">[] | undefined on the frontend
```

## Queries

- `listTodos` — returns `Doc<"todos">[]`, bounded to 50 items via `by_createdAt` index.

## Mutations

All mutations throw `ConvexError` on failure (standard Convex pattern).

- `createTodo` — trims and validates text before insert.
- `toggleTodoCompletion` — flips `completed` on existing todo.
- `removeTodo` — deletes existing todo.

## Tests

- `convex/features/todo_list/tests/contracts.test.ts` — pure function tests for limit normalization and text validation.
