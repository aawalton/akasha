import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCharacterRole = {
  id: "01a05fcd-f547-7e5d-aa6c-38b9f3d06600",
  type: "page-type/page-type",
  slug: "temper-character-role",
  definition: "the part a character plays in a group",
  extends: ["page-type/temper-character-thing"],
  properties: [{ pageProperty: "number-property/display-order", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A role's slug is its id, its name is its title, and its place is its display order.",
    },
  ],
  parts: ["change-generator/role-ids-keeping", "data-table/role-ids"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
