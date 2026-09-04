import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionWeaponTypes = {
  id: "01a06108-0770-70cf-94b7-bd4a064ac2f6",
  pageTypeSlug: "module",
  slug: "companion-weapon-types",
  definition: "every weapon a companion may hold, with whether the weapon takes both hands",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A weapon type's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A weapon type moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
