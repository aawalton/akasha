import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperTaskProgress = {
  id: "01a0a000-4b34-7137-9a7d-61ff29b56e1b",
  type: "page-type/page-type",
  slug: "temper-task-progress",
  definition: "a page property whose lines say how far each character has come",
  extends: ["page-type/page-property-entry"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line counts from the fields ending in current and total.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is labelled by the title of the page that line's one relation names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lines are ordered by display-order.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
