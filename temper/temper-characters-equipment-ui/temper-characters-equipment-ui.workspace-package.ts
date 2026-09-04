import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperCharactersEquipmentUi = {
  id: "01a06333-1bb2-7503-96cd-0be9991f4b14",
  pageTypeSlug: "workspace-package",
  slug: "temper-characters-equipment-ui",
  definition: "the pieces a browser draws a character's equipment with",
  manifest: "json",
  partSlugs: [
    "module/equipment-icon",
    "module/equipment-quality-rules",
    "module/eso-quality-text-classes",
  ],
} as const satisfies WorkspacePackage
