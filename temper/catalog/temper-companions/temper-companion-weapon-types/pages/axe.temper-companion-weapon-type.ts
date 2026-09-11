import type { TemperCompanionWeaponType } from "akasha/temper/catalog/temper-companions/temper-companion-weapon-types/temper-companion-weapon-type.page-type.types.ts"

export const axe = {
  id: "01a05fcd-ea6c-7898-9204-eb806c0ad500",
  type: "temper-companion-weapon-type",
  slug: "axe",
  key: "axe",
  title: "Axe",
  isOffHandOnly: false,
  isTwoHanded: false,
  displayOrder: 2,
} as const satisfies TemperCompanionWeaponType
