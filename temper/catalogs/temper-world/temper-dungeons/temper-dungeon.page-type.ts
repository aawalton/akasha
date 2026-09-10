import type { PageType } from "@akasha/pages/page-type"

export const temperDungeon = {
  id: "01a05fc4-7a8e-73b2-936f-9e3b86b17549",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-dungeon",
  definition: "a group instance a party fights through together",
  pluralSlug: "temper-dungeons",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/rotation-position",
    "relation-property/quest-giver",
    "text-property/solo-difficulty",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "relation-property/quest-giver", required: true, many: false },
    { pageProperty: "number-property/rotation-position", required: true, many: false },
    { pageProperty: "text-property/solo-difficulty", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
