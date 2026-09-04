import type { Module } from "@akasha/code-system/module"

export const routerSeamAdapters = {
  id: "01a0640f-8510-73e8-9766-6087a7ac4f3b",
  pageTypeSlug: "module",
  slug: "router-seam-adapters",
  definition: "the React Router pathname, query and link handed to the framework-free contexts",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A design package reads the router through a context rather than importing one.",
    },
    {
      invariantKind: "departure",
      statement: "The app the context is filled in is the only place React Router is named.",
    },
  ],
} as const satisfies Module
