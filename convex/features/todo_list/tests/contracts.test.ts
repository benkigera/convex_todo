import { describe, expect, it } from "vitest";
import {
  TODO_LIST_MAX_ITEMS,
  normalizeTodoListLimit,
} from "../queries";
import { validateTodoText } from "../mutations";

describe("todo_list contracts", () => {
  it("enforces read bounds", () => {
    expect(normalizeTodoListLimit(undefined)).toBe(TODO_LIST_MAX_ITEMS);
    expect(normalizeTodoListLimit(1000)).toBe(TODO_LIST_MAX_ITEMS);
    expect(normalizeTodoListLimit(25)).toBe(25);
  });

  it("rejects empty text via value contract", () => {
    expect(validateTodoText("   ")).toBe(false);
    expect(validateTodoText("Ship feature")).toBe(true);
  });
});
