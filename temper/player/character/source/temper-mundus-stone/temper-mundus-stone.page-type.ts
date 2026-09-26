import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperMundusStone = {
  id: "01a0df69-bdeb-70c4-a287-ed88cc239a92",
  type: "page-type/page-type",
  slug: "temper-mundus-stone",
  definition: "a mundus stone whose boon a character carries, or carrying no stone",
  extends: ["page-type/temper-thing"],
  parts: ["number-property/eso-mundus-id", "text-property/eso-icon-name"],
  properties: [
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "number-property/eso-mundus-id", required: true, many: false },
    { pageProperty: "text-property/eso-icon-name", required: false, many: false },
    {
      pageProperty: "record-property/source-effects",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A mundus stone's title is the name its effect source shows.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A mundus stone's hash place is the index a build hash has for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Divines armor grows every effect a mundus stone lists.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
