import type { TemperCompanionWeaponType } from "../temper-companion-weapon-type.page-type.ts"

export const dagger = {
  id: "01a05fcd-ea6d-75c8-a65a-8f83fbbdd731",
  pageTypeSlug: "temper-companion-weapon-type",
  slug: "dagger",
  key: "dagger",
  title: "Dagger",
  isOffHandOnly: false,
  isTwoHanded: false,
  displayOrder: 4,
} as const satisfies TemperCompanionWeaponType
