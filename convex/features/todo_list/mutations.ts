import { mutation } from "../../_generated/server";
import { ConvexError, v } from "convex/values";

export function validateTodoText(text: string) {
  return text.trim().length > 0;
}

export const createTodo = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const trimmedText = args.text.trim();
    if (!validateTodoText(trimmedText)) {
      throw new ConvexError("Todo text cannot be empty.");
    }

    return await ctx.db.insert("todos", {
      text: trimmedText,
      completed: false,
      createdAt: Date.now(),
    });
  },
});

export const toggleTodoCompletion = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new ConvexError("Todo not found.");
    }

    await ctx.db.patch(args.id, {
      completed: !todo.completed,
    });
  },
});

export const removeTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new ConvexError("Todo not found.");
    }

    await ctx.db.delete(args.id);
  },
});
