import { defineSchema } from "convex/server";
import { todoListTables } from "./features/todo_list/schema";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...todoListTables,
});
