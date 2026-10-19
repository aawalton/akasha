import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperAccountCharacter = {
  id: "01a05fcd-f547-75dd-87b1-fce27e98fddd",
  type: "page-type/page-type",
  slug: "temper-account-character",
  definition: "a character on an account",
  extends: ["page-type/temper-character-thing"],
  parts: [
    "multi-relation-property/character-roles",
    "text-property/first-name",
    "text-property/live-build-id",
    "file-property/fights",
    "module/character-lines-landing",
  ],
  properties: [
    { pageProperty: "text-property/eso-character-id", required: true, many: false },
    { pageProperty: "relation-property/account-page", required: true, many: false },
    { pageProperty: "text-property/first-name", required: false, many: false },
    { pageProperty: "text-property/live-build-id", required: false, many: false },
    {
      pageProperty: "multi-relation-property/character-roles",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "file-property/fights", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character is named by the account the character was rolled on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:48:48.327Z",
  updatedAt: "2026-10-19T19:00:36.676Z",
} as const satisfies PageType
