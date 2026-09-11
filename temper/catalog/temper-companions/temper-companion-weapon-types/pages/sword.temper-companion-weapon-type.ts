import type { TemperCompanionWeaponType } from "akasha/temper/catalog/temper-companions/temper-companion-weapon-types/temper-companion-weapon-type.page-type.types.ts"

export const sword = {
  id: "01a05fcd-ea70-7d20-8845-0949c75bb30d",
  pageTypeSlug: "temper-companion-weapon-type",
  type: "temper-companion-weapon-type",
  slug: "sword",
  key: "sword",
  title: "Sword",
  isOffHandOnly: false,
  isTwoHanded: false,
  displayOrder: 1,
} as const satisfies TemperCompanionWeaponType
