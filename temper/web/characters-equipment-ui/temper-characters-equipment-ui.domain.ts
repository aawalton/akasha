import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCharactersEquipmentUi = {
  id: "01a06333-1bb2-7503-96cd-0be9991f4b14",
  type: "page-type/domain",
  slug: "temper-characters-equipment-ui",
  definition: "the pieces drawing a character's equipment in a browser",
  parts: [
    "module/equipment-icon",
    "module/equipment-quality-rules",
    "module/eso-quality-text-classes",
    "module/item-level-select",
  ],
  createdAt: "2026-09-02T17:38:08.946Z",
  updatedAt: "2026-10-20T18:18:39.422Z",
} as const satisfies Domain
