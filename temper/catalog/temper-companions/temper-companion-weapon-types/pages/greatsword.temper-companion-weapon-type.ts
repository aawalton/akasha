import type { TemperCompanionWeaponType } from "akasha/temper/catalog/temper-companions/temper-companion-weapon-types/temper-companion-weapon-type.page-type.types.ts"

export const greatsword = {
  id: "01a05fcd-ea6e-7bb6-9628-5a72f8697fa5",
  pageTypeSlug: "temper-companion-weapon-type",
  type: "temper-companion-weapon-type",
  slug: "greatsword",
  key: "greatsword",
  title: "Greatsword",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 5,
} as const satisfies TemperCompanionWeaponType
