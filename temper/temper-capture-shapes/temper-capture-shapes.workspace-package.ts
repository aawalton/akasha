import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperCaptureShapes = {
  id: "01a0604d-23a0-70d4-9f11-7c21f7a7d1bc",
  pageTypeSlug: "workspace-package",
  slug: "temper-capture-shapes",
  definition: "the shape of every catalog the addon captures out of the running game",
  manifest: "json",
  partSlugs: [
    "module/class-catalog",
    "module/skill-catalog",
    "module/companion-skill-catalog",
    "module/companion-equipment-catalog",
    "module/achievement-catalog",
    "module/cadwell-catalog",
    "module/zone-completion-catalog",
    "module/recipe-catalog",
    "module/scribing-catalog",
    "module/trait-research-catalog",
    "module/item-set-catalog",
    "module/inventory-constants-catalog",
    "module/currency-catalog",
    "module/furniture-catalog",
    "module/collectibles-catalog",
    "module/lore-library-catalog",
    "module/antiquity-lore-catalog",
    "module/tribute-catalog",
    "module/poi-catalog",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A catalog here states a shape rather than holding the captured data.",
    },
    {
      invariantKind: "constraint",
      statement: "A field name here is the name the addon writes into the saved variables.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing here holds code that runs.",
    },
  ],
} as const satisfies WorkspacePackage
