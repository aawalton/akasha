import type { TemperCompanionWeaponType } from "akasha/temper/catalog/temper-companions/temper-companion-weapon-types/temper-companion-weapon-type.page-type.types.ts"

export const restorationStaff = {
  id: "01a05fcd-ea6f-7341-85d1-97b7d8e83f05",
  type: "temper-companion-weapon-type",
  slug: "restoration-staff",
  key: "restoration-staff",
  title: "Restoration Staff",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 12,
} as const satisfies TemperCompanionWeaponType
