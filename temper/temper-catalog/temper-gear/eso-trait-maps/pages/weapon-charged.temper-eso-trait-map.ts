import type { TemperEsoTraitMap } from "../temper-eso-trait-map.page-type.ts"

export const weaponCharged = {
  id: "01a05fd7-41cd-712f-a49e-e10992cffdbd",
  pageTypeSlug: "temper-eso-trait-map",
  slug: "weapon-charged",
  title: "Weapon Charged",
  key: "weapon:charged",
  traitFamily: "weapon",
  traitId: "charged",
  esoTraitNum: 2,
  displayOrder: 2,
} as const satisfies TemperEsoTraitMap
