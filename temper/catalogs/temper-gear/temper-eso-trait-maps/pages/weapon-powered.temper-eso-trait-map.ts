import type { TemperEsoTraitMap } from "../temper-eso-trait-map.page-type.ts"

export const weaponPowered = {
  id: "01a05fd7-41cf-7143-abff-539269dc1522",
  pageTypeSlug: "temper-eso-trait-map",
  slug: "weapon-powered",
  title: "Weapon Powered",
  key: "weapon:powered",
  traitFamily: "weapon",
  traitId: "powered",
  esoTraitNum: 1,
  displayOrder: 1,
} as const satisfies TemperEsoTraitMap
