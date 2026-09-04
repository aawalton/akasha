import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionWeaponBaseValues = {
  id: "01a06110-abe5-75a6-8700-8961742e6d8b",
  pageTypeSlug: "module",
  slug: "companion-weapon-base-values",
  definition: "the damage a companion weapon does before any quality or trait is applied",
  code: "ts",
} as const satisfies Module
