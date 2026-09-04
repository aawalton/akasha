import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionBulkUpdateEquipment = {
  id: "01a06152-c2c5-7e0c-8688-41d1ac8871ea",
  pageTypeSlug: "module",
  slug: "companion-bulk-update-equipment",
  definition: "bulk replacement of one trait or quality value across companion equipment slots",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The off-hand slot is skipped in the loop and mirrored from main-hand afterward.",
    },
    {
      invariantKind: "constraint",
      statement: "Mirroring to off-hand is suppressed when the main-hand weapon is two-handed.",
    },
    {
      invariantKind: "gap",
      statement: "A slot whose current value differs from the old value is left untouched.",
    },
  ],
} as const satisfies Module
