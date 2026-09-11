import type { TemperCompanionWeaponType } from "akasha/temper/catalog/temper-companions/temper-companion-weapon-types/temper-companion-weapon-type.page-type.types.ts"

export const maul = {
  id: "01a05fcd-ea6f-76c5-88c3-b2e0bf8adde2",
  type: "temper-companion-weapon-type",
  slug: "maul",
  key: "maul",
  title: "Maul",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 7,
} as const satisfies TemperCompanionWeaponType
