import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperSignatureScript = {
  id: "01a05fca-cb8a-7514-8c96-15d014bc0d9a",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-signature-script",
  definition: "the script naming the turn a scribed skill takes",
  pluralSlug: "temper-signature-scripts",
  extends: ["page-type/temper-script"],
  types: "ts",
} as const satisfies PageType
