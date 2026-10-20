import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperMundusStone = {
  id: "01a0df69-bdeb-70c4-a287-ed88cc239a92",
  type: "page-type/page-type",
  slug: "temper-mundus-stone",
  definition: "a mundus stone whose boon a character carries, or carrying no stone",
  extends: ["page-type/temper-thing"],
  parts: [
    "number-property/eso-mundus-id",
    "text-property/eso-icon-name",
    "number-property/boon-base",
    "number-property/boon-scale",
    "boolean-property/boon-at-tooltip",
  ],
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
    { pageProperty: "number-property/boon-base", required: false, many: false },
    { pageProperty: "number-property/boon-scale", required: false, many: false },
    { pageProperty: "boolean-property/boon-at-tooltip", required: false, many: false },
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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stone whose boon is a scale times a smaller base states the boon, the base and the scale.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A stone's boon base times its boon scale, rounded down, is the boon it states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The Lord's boon of 2225 health is 1.1 times a base of 2023, the Tower's and the Mage's boon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Divines floors a base times one plus the unrounded shares, then floors the scale times that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A boon's tooltip number is the value the character gets only on a stone stating boon at tooltip.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The Lady, the Lover and the Thief apply their tooltip number; the Lord and the Mage do not.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
  createdAt: "2026-09-26T20:30:44.203Z",
  updatedAt: "2026-10-20T19:10:29.556Z",
} as const satisfies PageType
