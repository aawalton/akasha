import type { TypeDeclaration } from "../../../code-system/type-declarations/type-declaration.page-type.ts"

export const leadsGlobalDeclarations = {
  id: "01a06274-b08b-7d77-84f1-e4cc639b4458",
  pageTypeSlug: "type-declaration",
  slug: "leads-global-declarations",
  definition: "the shape of the table the lead window's markup calls into",
  d: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A key here is spelled as the markup that calls the key spells the key.",
    },
  ],
} as const satisfies TypeDeclaration
