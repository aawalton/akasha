import type { TemperCompanionWeaponType } from "../temper-companion-weapon-type.page-type.ts"

export const bow = {
  id: "01a05fcd-ea6d-731d-b902-cafe6af3d855",
  pageTypeSlug: "temper-companion-weapon-type",
  slug: "bow",
  key: "bow",
  title: "Bow",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 8,
} as const satisfies TemperCompanionWeaponType
