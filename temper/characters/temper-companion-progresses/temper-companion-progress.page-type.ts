import type { PageType } from "@akasha/pages/page-type"

export const temperCompanionProgress = {
  id: "01a05fcd-f54b-7497-b549-b7f8ef55b323",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-companion-progress",
  definition: "how far a companion has come with one account",
  pluralSlug: "temper-companion-progresses",
  extends: ["page-type/temper-character-thing"],
  parts: ["relation-property/companion-roles"],
  properties: [
    { pageProperty: "text-property/companion-id", required: true, many: false },
    { pageProperty: "text-property/account-page", required: true, many: false },
    {
      pageProperty: "relation-property/companion-roles",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  types: "ts",
} as const satisfies PageType
