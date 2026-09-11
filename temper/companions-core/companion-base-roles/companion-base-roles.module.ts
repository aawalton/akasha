import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const companionBaseRoles = {
  id: "01a06108-0764-711e-b931-1a61746c79b0",
  type: "module",
  slug: "companion-base-roles",
  definition: "every duty a companion is built to cover, with the gear each duty is built around",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
  ],
} as const satisfies Module
