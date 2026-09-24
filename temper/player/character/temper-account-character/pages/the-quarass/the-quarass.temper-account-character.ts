import type { TemperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.types.ts"

export const theQuarass = {
  id: "019dda20-9520-7261-a87f-6f2567dd6020",
  type: "page-type/temper-account-character",
  slug: "the-quarass",
  title: "The Quarass",
  displayOrder: 6,
  completion: "json",
  esoCharacterId: "8796093041077793",
  accountPage: "temper-account/alanarre",
  firstName: "The Quarass",
} as const satisfies TemperAccountCharacter
