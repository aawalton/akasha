import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperEquipment = {
  id: "01a060d5-2f11-79b8-9e55-62a1973c12cc",
  pageTypeSlug: "workspace-package",
  slug: "temper-equipment",
  definition: "the types an Elder Scrolls Online gear set and the pieces it covers are named by",
  manifest: "json",
  parts: [
    "module/set-ids",
    "module/set-ids-a-to-o",
    "module/set-ids-p-to-z",
    "module/armor-weight-ids",
    "module/set-category-ids",
    "module/set-patterns",
    "module/set-template",
    "module/weapon-type-ids",
    "module/armor-traits",
    "module/eso-trait-map",
    "module/jewelry-traits",
    "module/weapon-traits",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The generated table of gear sets is outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "Every set id here is written out from the set pages rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A trait moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies WorkspacePackage
