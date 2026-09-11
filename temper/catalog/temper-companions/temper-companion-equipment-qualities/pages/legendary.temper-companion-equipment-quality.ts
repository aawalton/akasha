import type { TemperCompanionEquipmentQuality } from "akasha/temper/catalog/temper-companions/temper-companion-equipment-qualities/temper-companion-equipment-quality.page-type.types.ts"

export const legendary = {
  id: "01a05fcd-ea6b-7f78-909e-9730f0168629",
  type: "temper-companion-equipment-quality",
  slug: "legendary",
  key: "legendary",
  title: "Legendary",
  available: false,
  displayOrder: 5,
} as const satisfies TemperCompanionEquipmentQuality
