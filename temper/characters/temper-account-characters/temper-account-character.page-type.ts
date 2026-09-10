import type { PageType } from "@akasha/pages/page-type"

export const temperAccountCharacter = {
  id: "01a05fcd-f547-75dd-87b1-fce27e98fddd",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-account-character",
  definition: "one character on an account",
  pluralSlug: "temper-account-characters",
  extends: ["page-type/temper-character-thing"],
  parts: [
    "relation-property/character-roles",
    "text-property/first-name",
    "text-property/live-build-id",
  ],
  properties: [
    { pageProperty: "text-property/eso-character-id", required: true, many: false },
    { pageProperty: "text-property/account-page", required: true, many: false },
    { pageProperty: "text-property/first-name", required: false, many: false },
    { pageProperty: "text-property/live-build-id", required: false, many: false },
    {
      pageProperty: "relation-property/character-roles",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character is named by the account the character was rolled on.",
    },
  ],
  types: "ts",
} as const satisfies PageType
