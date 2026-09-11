import type { TemperCompanionWeaponType } from "akasha/temper/catalog/temper-companions/temper-companion-weapon-types/temper-companion-weapon-type.page-type.types.ts"

export const iceStaff = {
  id: "01a05fcd-ea6e-7f89-aded-b151567d06b7",
  type: "temper-companion-weapon-type",
  slug: "ice-staff",
  key: "ice-staff",
  title: "Ice Staff",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 10,
} as const satisfies TemperCompanionWeaponType
