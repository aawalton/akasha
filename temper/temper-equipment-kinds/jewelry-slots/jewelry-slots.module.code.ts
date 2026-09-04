import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface JewelrySlotTemplate {
  id: string
  name: string
  typeId: string
  icon: string
}

const JEWELRY_SLOT_DATA = {
  "necklace": {
    id: "necklace" as const,
    name: "Necklace",
    typeId: "necklace" as const,
    icon: "/resources/gearslot_neck.png",
  },
  "ring-1": {
    id: "ring-1" as const,
    name: "Ring 1",
    typeId: "ring" as const,
    icon: "/resources/gearslot_ring.png",
  },
  "ring-2": {
    id: "ring-2" as const,
    name: "Ring 2",
    typeId: "ring" as const,
    icon: "/resources/gearslot_ring.png",
  },
} satisfies Record<string, JewelrySlotTemplate>

export const jewelrySlots = createDataFile<JewelrySlotTemplate>()(JEWELRY_SLOT_DATA)

export type JewelrySlotId = (typeof jewelrySlots.ids)[number]
