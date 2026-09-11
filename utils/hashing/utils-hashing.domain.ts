import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const utilsHashing = {
  id: "01a08ef4-823c-768d-8a6d-6d848d6866af",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "utils-hashing",
  definition: "a body reduced to the digest that names it",
  parts: ["module/sha256-hex"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One module holds one digest rather than one module taking the digest's name.",
    },
    {
      invariantKind: "absence",
      statement: "A digest shortened or salted is that caller's rule rather than one here.",
    },
  ],
} as const satisfies Domain
