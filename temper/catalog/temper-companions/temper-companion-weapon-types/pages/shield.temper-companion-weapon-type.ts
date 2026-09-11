import type { TemperCompanionWeaponType } from "akasha/temper/catalog/temper-companions/temper-companion-weapon-types/temper-companion-weapon-type.page-type.types.ts"

export const shield = {
  id: "01a05fcd-ea70-706d-82b2-f64fc815bb91",
  type: "temper-companion-weapon-type",
  slug: "shield",
  key: "shield",
  title: "Shield",
  isOffHandOnly: true,
  isTwoHanded: false,
  displayOrder: 13,
} as const satisfies TemperCompanionWeaponType
