import type { PageType } from "@akasha/pages/page-type"

export const temperGuildTrader = {
  id: "01a05fcb-fd2c-7cff-9144-3d6612a42fa5",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-guild-trader",
  definition: "a kiosk a guild rents to sell from",
  pluralSlug: "temper-guild-traders",
  extends: ["page-type/temper-thing"],
  parts: ["number-property/kiosk-id"],
  properties: [{ pageProperty: "number-property/kiosk-id", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
