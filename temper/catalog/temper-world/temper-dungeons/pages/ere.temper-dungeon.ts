import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeons/temper-dungeon.page-type.types.ts"

export const ere = {
  id: "01a05fc5-7426-7e01-b5d3-5cc8571c2118",
  type: "temper-dungeon",
  slug: "ere",
  title: "Earthen Root Enclave",
  key: "ERE",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 24,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
