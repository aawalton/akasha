import type { TemperCompanionWeaponType } from "../temper-companion-weapon-type.page-type.ts"

export const shield = {
  id: "01a05fcd-ea70-706d-82b2-f64fc815bb91",
  pageTypeSlug: "temper-companion-weapon-type",
  slug: "shield",
  key: "shield",
  title: "Shield",
  isOffHandOnly: true,
  isTwoHanded: false,
  displayOrder: 13,
} as const satisfies TemperCompanionWeaponType
