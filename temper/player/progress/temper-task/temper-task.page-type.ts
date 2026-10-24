import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperTask = {
  id: "01a05fd3-435f-7ddd-a951-70e6e3d31e07",
  type: "page-type/page-type",
  slug: "temper-task",
  definition: "something Alan means to do in the game, once or again and again",
  extends: ["page-type/temper-progress-thing"],
  parts: [
    "boolean-property/pending-sync",
    "calendar-time-property/due-time",
    "instant-property/completed-at",
    "instant-property/last-completed-at",
    "computed-property/character-sort-order",
    "number-property/progress-current",
    "number-property/progress-total",
    "relation-property/effective-character",
    "temper-task-progress/progress",
    "boolean-property/filler",
  ],
  properties: [
    { pageProperty: "relation-property/account-page", required: true, many: false },
    { pageProperty: "select-property/scope", required: true, many: false },
    { pageProperty: "select-property/priority", required: true, many: false },
    { pageProperty: "calendar-time-property/due-time", required: false, many: false },
    { pageProperty: "relation-property/effective-character", required: false, many: false },
    { pageProperty: "instant-property/last-completed-at", required: false, many: false },
    { pageProperty: "instant-property/completed-at", required: false, many: false },
    { pageProperty: "temper-task-progress/progress", required: false, many: false },
    { pageProperty: "number-property/progress-total", required: false, many: false },
    { pageProperty: "number-property/progress-current", required: false, many: false },
    { pageProperty: "computed-property/character-sort-order", required: false, many: false },
    {
      pageProperty: "boolean-property/pending-sync",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pageProperty: "boolean-property/filler", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A task stating no recurrence is marked done and kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A due date moves on what the characters did rather than on the day changing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task of `character` scope falls to the one character the task names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A task of `next_character` scope falls to the character the task names as effective.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:54:35.999Z",
  updatedAt: "2026-10-24T19:44:51.388Z",
} as const satisfies PageType
