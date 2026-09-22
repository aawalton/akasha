import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionProgress = {
  id: "01a05fcd-f54b-7497-b549-b7f8ef55b323",
  type: "page-type/page-type",
  slug: "temper-companion-progress",
  definition: "how far a companion has come with an account",
  extends: ["page-type/temper-character-thing"],
  parts: ["multi-relation-property/companion-roles"],
  properties: [
    { pageProperty: "text-property/companion-id", required: true, many: false },
    { pageProperty: "text-property/account-page", required: true, many: false },
    {
      pageProperty: "multi-relation-property/companion-roles",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
