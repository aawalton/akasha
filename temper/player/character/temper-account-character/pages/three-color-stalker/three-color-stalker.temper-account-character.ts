import type { TemperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.types.ts"

export const threeColorStalker = {
  id: "019dda20-a0b3-7b8b-ae04-dae6143ee548",
  type: "page-type/temper-account-character",
  slug: "three-color-stalker",
  title: "Three-Color Stalker",
  displayOrder: 4,
  completion: "json",
  esoCharacterId: "8796093022613905",
  accountPage: "temper-account/alanarre",
  targetBuildId: "01a19778-55b4-71a3-97fe-9d01b334eef7",
  targetBuildIds: ["01a19778-55b4-71a3-97fe-9d01b334eef7"],
  race: "temper-race/khajiit",
  class: "temper-class/nightblade",
  firstName: "Three-Color",
  fights: "jsonl",
  readings: "jsonl",
  createdAt: "2026-04-29T16:44:24.627Z",
  updatedAt: "2026-11-01T18:43:46.704Z",
} as const satisfies TemperAccountCharacter
