import type { Domain } from "../../domains/domain.page-type.types.ts"

export const temperEquipmentKinds = {
  id: "01a060b8-08c3-7a47-a8fa-29a32e398b30",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-equipment-kinds",
  definition: "the slots, types and quality tiers a piece of Elder Scrolls Online gear is named by",
  parts: [
    "module/armor-slots",
    "module/armor-types",
    "module/jewelry-slots",
    "module/jewelry-types",
    "module/weapon-slots",
    "module/weapon-bars",
    "module/equipment-qualities",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every row here answers to a page of the equipment page types.",
    },
    {
      invariantKind: "departure",
      statement: "A gear set is named outside this folder.",
    },
  ],
} as const satisfies Domain
