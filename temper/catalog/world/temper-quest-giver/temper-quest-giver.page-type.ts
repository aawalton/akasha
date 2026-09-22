import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperQuestGiver = {
  id: "01a05fc4-7a94-7f79-9230-59fb6df46445",
  type: "page-type/page-type",
  slug: "temper-quest-giver",
  definition: "a character handing out the pledges of a day",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["calendar-date-property/epoch", "number-property/cycle-length"],
  properties: [
    { pageProperty: "number-property/cycle-length", required: true, many: false },
    { pageProperty: "calendar-date-property/epoch", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
