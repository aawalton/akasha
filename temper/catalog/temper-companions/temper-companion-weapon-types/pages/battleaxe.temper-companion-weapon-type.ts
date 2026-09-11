import type { TemperCompanionWeaponType } from "akasha/temper/catalog/temper-companions/temper-companion-weapon-types/temper-companion-weapon-type.page-type.types.ts"

export const battleaxe = {
  id: "01a05fcd-ea6c-7761-a6b6-2c3c70368794",
  type: "temper-companion-weapon-type",
  slug: "battleaxe",
  key: "battleaxe",
  title: "Battleaxe",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 6,
} as const satisfies TemperCompanionWeaponType
