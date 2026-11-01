import type { TemperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.types.ts"

export const erinSolstice = {
  id: "019dda20-a963-727d-8922-2712d94cd668",
  type: "page-type/temper-account-character",
  slug: "erin-solstice",
  title: "Erin Solstice",
  displayOrder: 1,
  completion: "json",
  targetBuildId: "01a1991b-790f-716d-970d-07dc4d919d00",
  esoCharacterId: "8796093022338107",
  accountPage: "temper-account/alanarre",
  race: "temper-race/imperial",
  class: "temper-class/dragonknight",
  firstName: "Erin",
  targetBuildIds: ["01a198e6-6cc4-7ceb-b875-875f1260222c", "01a1991b-790f-716d-970d-07dc4d919d00"],
  fights: "jsonl",
  readings: "jsonl",
  removedReadings: "jsonl",
  createdAt: "2026-04-29T16:44:26.851Z",
  updatedAt: "2026-11-01T23:40:40.201Z",
} as const satisfies TemperAccountCharacter
