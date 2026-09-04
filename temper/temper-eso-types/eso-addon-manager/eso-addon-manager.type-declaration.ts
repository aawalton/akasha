import type { TypeDeclaration } from "../../../code-system/type-declarations/type-declaration.page-type.ts"

export const esoAddonManager = {
  id: "01a0608f-b07a-7cb5-bbb7-1a6889848a1b",
  pageTypeSlug: "type-declaration",
  slug: "eso-addon-manager",
  definition: "the call handing back the game's add-on manager",
  d: "ts",
} as const satisfies TypeDeclaration
