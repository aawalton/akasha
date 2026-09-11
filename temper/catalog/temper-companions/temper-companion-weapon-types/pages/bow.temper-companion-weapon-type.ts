import type { TemperCompanionWeaponType } from "akasha/temper/catalog/temper-companions/temper-companion-weapon-types/temper-companion-weapon-type.page-type.types.ts"

export const bow = {
  id: "01a05fcd-ea6d-731d-b902-cafe6af3d855",
  type: "temper-companion-weapon-type",
  slug: "bow",
  key: "bow",
  title: "Bow",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 8,
} as const satisfies TemperCompanionWeaponType
