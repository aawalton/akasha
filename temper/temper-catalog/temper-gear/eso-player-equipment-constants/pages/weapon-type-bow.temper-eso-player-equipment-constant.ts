import type { TemperEsoPlayerEquipmentConstant } from "../temper-eso-player-equipment-constant.page-type.ts"

export const weaponTypeBow = {
  id: "01a05fd7-41c2-72ca-b59e-fe1323730143",
  pageTypeSlug: "temper-eso-player-equipment-constant",
  slug: "weapon-type-bow",
  title: "Weapon Type Bow",
  key: "weapon-type:bow",
  constantFamily: "weapon-type",
  constantId: "bow",
  esoNum: 8,
  displayOrder: 7,
} as const satisfies TemperEsoPlayerEquipmentConstant
