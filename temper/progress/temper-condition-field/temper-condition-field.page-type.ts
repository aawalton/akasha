import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperConditionField = {
  id: "01a07202-f0fd-7b35-bff8-c4cc5e25da86",
  type: "page-type/page-type",
  slug: "temper-condition-field",
  definition: "one thing about an item that a rule condition tests",
  extends: ["page-type/temper-progress-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key is the field an item rule writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The title is the field a reader is shown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A condition names one field here and the value that field is tested against.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field whose key ends in Op says how another field's number is compared.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
