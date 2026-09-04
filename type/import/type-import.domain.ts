import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const typeImport = {
  id: "01a049e9-651c-7007-8abb-675c750009bb",
  pageTypeSlug: "domain",
  slug: "type-import",
  definition: "one file using what another declares",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An akasha file imports no tracked file from outside the akasha folder.",
    },
  ],
} as const satisfies Domain
