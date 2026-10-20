import type { TemperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.types.ts"

export const erinSolstice = {
  id: "019dda20-a963-727d-8922-2712d94cd668",
  type: "page-type/temper-account-character",
  slug: "erin-solstice",
  title: "Erin Solstice",
  displayOrder: 1,
  completion: "json",
  esoCharacterId: "8796093022338107",
  accountPage: "temper-account/alanarre",
  race: "temper-race/imperial",
  class: "temper-class/dragonknight",
  firstName: "Erin",
  fights: "jsonl",
  readings: "jsonl",
  removedReadings: "jsonl",
  createdAt: "2026-04-29T16:44:26.851Z",
  updatedAt: "2026-10-20T16:29:05.834Z",
} as const satisfies TemperAccountCharacter
