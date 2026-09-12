export const CHARACTER_TOGGLE_NAMES = [
  "equipment",
  "lockWornGear",
  "food",
  "potions",
  "skills",
  "championPoints",
  "attributes",
  "soulGems",
  "repairKits",
  "recharge",
  "repair",
  "lockpicks",
  "experienceScrolls",
  "dailyWrits",
  "dailyWritBlacksmithing",
  "dailyWritClothier",
  "dailyWritWoodworking",
  "dailyWritJewelrycrafting",
  "dailyWritEnchanting",
  "dailyWritAlchemy",
  "dailyWritProvisioning",
  "dailyWritAutoCraft",
  "masterWrits",
  "masterWritBlacksmithing",
  "masterWritClothier",
  "masterWritWoodworking",
  "masterWritJewelrycrafting",
  "masterWritEnchanting",
  "masterWritAlchemy",
  "masterWritProvisioning",
] as const

export const COMPANION_TOGGLE_NAMES = ["equipment", "skills"] as const

export type CharacterToggleName = (typeof CHARACTER_TOGGLE_NAMES)[number]
export type CompanionToggleName = (typeof COMPANION_TOGGLE_NAMES)[number]

export type CharacterAutomationToggles = { [Name in CharacterToggleName]?: boolean }
export type CompanionAutomationToggles = { [Name in CompanionToggleName]?: boolean }

export type AutomationSettings = {
  global?: {
    characters?: CharacterAutomationToggles
    companions?: CompanionAutomationToggles
  }
  characters: Record<string, CharacterAutomationToggles>
  companions: Record<string, CompanionAutomationToggles>
}

const CHARACTER_TOGGLE_SET: ReadonlySet<string> = new Set(CHARACTER_TOGGLE_NAMES)
const COMPANION_TOGGLE_SET: ReadonlySet<string> = new Set(COMPANION_TOGGLE_NAMES)

export function isCharacterToggleName(name: string): name is CharacterToggleName {
  return CHARACTER_TOGGLE_SET.has(name)
}

export function isCompanionToggleName(name: string): name is CompanionToggleName {
  return COMPANION_TOGGLE_SET.has(name)
}

export function characterToggleNamesSaid(): string {
  return CHARACTER_TOGGLE_NAMES.join(", ")
}

export function companionToggleNamesSaid(): string {
  return COMPANION_TOGGLE_NAMES.join(", ")
}
