import { defineTable } from "convex/server";
import { v } from "convex/values";

export const todoListTables = {
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
};
