/**
 * Temper Companion Jewelry Slots (Generated)
 *
 * The three positions where companion jewelry can be equipped —
 * necklace, ring-1, ring-2 — sourced from the universal pages table
 * (page type: temper-companion-jewelry-slot). Companions have the same
 * jewelry slots as player characters.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@shared/utils-narrow/create-data-file"

interface CompanionJewelrySlotTemplate {
  id: string
  name: string
  equipType: number
  slotCategory: string
}

const COMPANION_JEWELRY_SLOTS_DATA = {
  "necklace": {
    id: "necklace" as const,
    name: "Necklace",
    equipType: 2,
    slotCategory: "necklace",
  },
  "ring-1": {
    id: "ring-1" as const,
    name: "Ring 1",
    equipType: 12,
    slotCategory: "ring",
  },
  "ring-2": {
    id: "ring-2" as const,
    name: "Ring 2",
    equipType: 12,
    slotCategory: "ring",
  },
} satisfies Record<string, CompanionJewelrySlotTemplate>

export const companionJewelrySlots = createDataFile<CompanionJewelrySlotTemplate>()(
  COMPANION_JEWELRY_SLOTS_DATA
)
