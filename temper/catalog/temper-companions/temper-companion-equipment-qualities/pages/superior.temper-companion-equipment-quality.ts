import type { TemperCompanionEquipmentQuality } from "akasha/temper/catalog/temper-companions/temper-companion-equipment-qualities/temper-companion-equipment-quality.page-type.types.ts"

export const superior = {
  id: "01a05fcd-ea6c-7ad2-ab83-40a6fbbc4cfa",
  type: "temper-companion-equipment-quality",
  slug: "superior",
  key: "superior",
  title: "Superior",
  available: true,
  displayOrder: 3,
} as const satisfies TemperCompanionEquipmentQuality
