import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperScript } from "../scripts/temper-script.page-type.ts"

export type TemperSignatureScript = TemperScript

export const temperSignatureScript = {
  id: "01a05fca-cb8a-7514-8c96-15d014bc0d9a",
  pageTypeSlug: "page-type",
  slug: "temper-signature-script",
  definition: "the script naming the turn a scribed skill takes",
  pluralSlug: "temper-signature-scripts",
  extendsSlug: ["page-type/temper-script"],
} as const satisfies PageType
