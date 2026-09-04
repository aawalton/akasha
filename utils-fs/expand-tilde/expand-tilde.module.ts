import type { Module } from "../../code-system/modules/module.page-type.ts"

export const expandTilde = {
  id: "01a05c4c-9442-70c2-948c-b1d7ad5a033f",
  pageTypeSlug: "module",
  slug: "expand-tilde",
  definition: "a path spelled from home read as the path it stands at",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "A tilde anywhere but the front of a path is left unchanged.",
    },
  ],
} as const satisfies Module
