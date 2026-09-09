import type { TemperCompanionWeaponType } from "../temper-companion-weapon-type.page-type.ts"

export const lightningStaff = {
  id: "01a05fcd-ea6e-7b52-b906-d4451b8632b4",
  pageTypeSlug: "temper-companion-weapon-type",
  slug: "lightning-staff",
  key: "lightning-staff",
  title: "Lightning Staff",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 11,
} as const satisfies TemperCompanionWeaponType
