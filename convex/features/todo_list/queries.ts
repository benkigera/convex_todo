import { query } from "../../_generated/server";
import { v } from "convex/values";

export const TODO_LIST_MAX_ITEMS = 50;

export function normalizeTodoListLimit(limit?: number): number {
  return Math.min(limit ?? TODO_LIST_MAX_ITEMS, TODO_LIST_MAX_ITEMS);
}

export const listTodos = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = normalizeTodoListLimit(args.limit);
    return await ctx.db
      .query("todos")
      .withIndex("by_createdAt")
      .order("desc")
      .take(limit);
  },
});
