import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperQuestGiver = {
  id: "01a05fc4-7a94-7f79-9230-59fb6df46445",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-quest-giver",
  definition: "a character handing out the pledges of a day",
  pluralSlug: "temper-quest-givers",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/cycle-length", "text-property/epoch"],
  properties: [
    { pageProperty: "number-property/cycle-length", required: true, many: false },
    { pageProperty: "text-property/epoch", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
