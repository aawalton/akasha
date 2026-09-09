import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { Tokens } from "./properties/tokens.file-property.ts"

export type EsoOptInList = Domain & {
  tokens: Tokens
}

export const esoOptInList = {
  id: "01a081b0-6ef0-79f7-8191-4b78fb717423",
  pageTypeSlug: "page-type",
  slug: "eso-opt-in-list",
  definition: "the eso api tokens chosen to be declared",
  pluralSlug: "eso-opt-in-lists",
  parts: ["file-property/tokens"],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "file-property/tokens", required: true, many: false }],
} as const satisfies PageType
