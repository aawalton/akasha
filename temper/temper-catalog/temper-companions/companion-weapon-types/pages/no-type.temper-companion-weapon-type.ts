import type { TemperCompanionWeaponType } from "../temper-companion-weapon-type.page-type.ts"

export const noType = {
  id: "01a05fcd-ea6f-73bf-b668-ede30ae3533e",
  pageTypeSlug: "temper-companion-weapon-type",
  slug: "no-type",
  key: "no-type",
  title: "No Weapon",
  isOffHandOnly: false,
  isTwoHanded: false,
  displayOrder: 0,
} as const satisfies TemperCompanionWeaponType
