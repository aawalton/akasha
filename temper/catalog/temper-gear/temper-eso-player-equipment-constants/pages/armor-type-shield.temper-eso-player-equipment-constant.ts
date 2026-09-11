import type { TemperEsoPlayerEquipmentConstant } from "akasha/temper/catalog/temper-gear/temper-eso-player-equipment-constants/temper-eso-player-equipment-constant.page-type.types.ts"

export const armorTypeShield = {
  id: "01a05fd7-41bf-7568-8f09-dc7b7ad1220a",
  type: "temper-eso-player-equipment-constant",
  slug: "armor-type-shield",
  title: "Armor Type Shield",
  key: "armor-type:shield",
  constantFamily: "armor-type",
  constantId: "shield",
  esoNum: 0,
  displayOrder: 4,
} as const satisfies TemperEsoPlayerEquipmentConstant
