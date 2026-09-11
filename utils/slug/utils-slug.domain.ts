import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const utilsSlug = {
  id: "01a08e6f-55be-71c8-8946-b4047f5a9d4c",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "utils-slug",
  definition: "how a string is folded to the dashed key that names it",
  parts: ["module/slug-of"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One module holds one folding rather than one module taking a flag.",
    },
    {
      invariantKind: "absence",
      statement:
        "A folding wrapped in a fallback or a prefix is that caller's rule rather than one here.",
    },
  ],
} as const satisfies Domain
