import type { TemperEsoTraitMap } from "../temper-eso-trait-map.page-type.ts"

export const weaponInfused = {
  id: "01a05fd7-41ce-7ce1-9a53-5473cd6f35f6",
  pageTypeSlug: "temper-eso-trait-map",
  slug: "weapon-infused",
  title: "Weapon Infused",
  key: "weapon:infused",
  traitFamily: "weapon",
  traitId: "infused",
  esoTraitNum: 4,
  displayOrder: 4,
} as const satisfies TemperEsoTraitMap
