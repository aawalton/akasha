import type { TemperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.types.ts"

export const archmageAmerys = {
  id: "019dda20-785c-725c-9755-e858993eda07",
  type: "page-type/temper-account-character",
  slug: "archmage-amerys",
  title: "Archmage Amerys",
  displayOrder: 9,
  completion: "json",
  esoCharacterId: "8796093038720681",
  accountPage: "temper-account/alanarre",
  targetBuildId: "01a156e9-34d2-7301-a473-64b1b0bcf407",
  race: "temper-race/redguard",
  class: "temper-class/sorcerer",
  firstName: "Amerys",
  fights: "jsonl",
  readings: "jsonl",
  removedReadings: "jsonl",
  createdAt: "2026-04-29T16:44:14.300Z",
  updatedAt: "2026-10-20T13:47:12.966Z",
} as const satisfies TemperAccountCharacter
