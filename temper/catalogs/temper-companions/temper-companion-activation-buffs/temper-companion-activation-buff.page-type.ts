import type { PageType } from "@akasha/pages/page-type"

export const temperCompanionActivationBuff = {
  id: "01a05fcd-41a7-7f50-b3d4-a62fb6c122e1",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-companion-activation-buff",
  definition: "a sort of buff a companion ability grants on activation",
  pluralSlug: "temper-companion-activation-buffs",
  extends: ["page-type/temper-companion-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
