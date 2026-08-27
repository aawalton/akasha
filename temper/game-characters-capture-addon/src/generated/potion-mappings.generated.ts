/**
 * Potion Mappings (Generated)
 *
 * Maps ESO potion item IDs and crafted potion encoded traits to temper indices and string IDs.
 * Crown/dropped potions match by itemId, crafted potions match by encodedTraits
 * (packed alchemy effect IDs from the item link's PotionData field).
 *
 * Source: engine/alchemy/potions-source.ts, engine/alchemy/potion-encoded-traits.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

/** Crown/dropped potion itemId → codec index */
export const POTION_ITEM_ID_TO_INDEX: Record<number, number> = {
  [64710]: 1, // Crown Tri-Restoration Potion
  [112427]: 2, // Gold Coast Spellcaster Elixir
  [112428]: 3, // Gold Coast Warrior Elixir
  [124674]: 4, // Gold Coast Swift Survivor Elixir
  [27036]: 5, // Essence of Health
  [27037]: 6, // Essence of Magicka
  [27038]: 7, // Essence of Stamina
  [176041]: 8, // Essence of Potent Health
  [176040]: 9, // Essence of Potent Magicka
  [176042]: 10, // Essence of Potent Stamina
}

/** Crown/dropped potion itemId → temper ID */
export const POTION_ITEM_ID_TO_TEMPER_ID: Record<number, string> = {
  [64710]: "crown-tri-restoration-potion", // Crown Tri-Restoration Potion
  [112427]: "gold-coast-spellcaster-elixir", // Gold Coast Spellcaster Elixir
  [112428]: "gold-coast-warrior-elixir", // Gold Coast Warrior Elixir
  [124674]: "gold-coast-swift-survivor-elixir", // Gold Coast Swift Survivor Elixir
  [27036]: "essence-of-health", // Essence of Health
  [27037]: "essence-of-magicka", // Essence of Magicka
  [27038]: "essence-of-stamina", // Essence of Stamina
  [176041]: "essence-of-potent-health", // Essence of Potent Health
  [176040]: "essence-of-potent-magicka", // Essence of Potent Magicka
  [176042]: "essence-of-potent-stamina", // Essence of Potent Stamina
}

/** Crafted potion encodedTraits → codec index */
export const POTION_ENCODED_TRAITS_TO_INDEX: Record<number, number> = {
  [8849689]: 11, // Essence of Physical Resistance (traits: 7,9,25)
  [8456477]: 12, // Essence of Health (traits: 1,9,29)
  [8984861]: 13, // Essence of Vitality (traits: 9,25,29)
  [9772288]: 14, // Essence of Detection (traits: 21,29)
  [8455433]: 15, // Essence of Health (traits: 1,5,9)
  [9902363]: 16, // Essence of Speed (traits: 23,25,27,29)
  [8454917]: 17, // Essence of Health (traits: 1,3,5)
  [8586519]: 18, // Essence of Magicka (traits: 3,5,23)
  [8722207]: 19, // Essence of Stamina (traits: 5,23,31)
  [8722203]: 20, // Essence of Stamina (traits: 5,23,27)
  [8719639]: 21, // Essence of Weapon Power (traits: 5,13,23)
  [8719633]: 22, // Essence of Weapon Power (traits: 5,13,17)
  [8459805]: 23, // Essence of Health (traits: 1,22,29)
  [8458006]: 24, // Essence of Spell Critical (traits: 1,15,22)
  [8454919]: 25, // Essence of Health (traits: 1,3,7)
  [8587029]: 26, // Essence of Magicka (traits: 3,7,21)
  [8454927]: 27, // Essence of Spell Critical (traits: 1,3,15)
  [8455945]: 28, // Essence of Health (traits: 1,7,9)
  [8587033]: 29, // Essence of Magicka (traits: 3,7,25)
  [10165535]: 30, // Essence of Vitality (traits: 27,29,31)
  [8586517]: 31, // Essence of Magicka (traits: 3,5,21)
  [8588053]: 32, // Essence of Spell Power (traits: 3,11,21)
  [8720661]: 33, // Essence of Weapon Crit (traits: 5,17,21)
  [8586527]: 34, // Essence of Magicka (traits: 3,5,31)
  [8455441]: 35, // Essence of Weapon Crit (traits: 1,5,17)
  [8588047]: 36, // Essence of Spell Power (traits: 3,11,15)
  [8458001]: 37, // Essence of Weapon Crit (traits: 1,15,17)
  [9837343]: 38, // Essence of Invisible (traits: 22,27,31)
  [9836319]: 39, // Essence of Speed (traits: 22,23,31)
  [9903391]: 40, // Essence of Speed (traits: 23,29,31)
  [9836317]: 41, // Essence of Speed (traits: 22,23,29)
  [9902879]: 42, // Essence of Speed (traits: 23,27,31)
  [8589079]: 43, // Essence of Spell Critical (traits: 3,15,23)
  [8591129]: 44, // Essence of Magicka (traits: 3,23,25)
  [9836315]: 45, // Essence of Speed (traits: 22,23,27)
}

/** Crafted potion encodedTraits → temper ID */
export const POTION_ENCODED_TRAITS_TO_TEMPER_ID: Record<number, string> = {
  [8849689]: "protection-resistance-physical-resistance-spell", // Essence of Physical Resistance
  [8456477]: "fortitude-vitality-health-restore-resistance-physical", // Essence of Health
  [8984861]: "vitality-protection-resistance-physical", // Essence of Vitality
  [9772288]: "vitality-stealth-detection", // Essence of Detection
  [8455433]: "endurance-fortitude-health-restore-resistance-physical-stamina-restore", // Essence of Health
  [9902363]: "expedition-vitality-protection-health-restore", // Essence of Speed
  [8454917]: "endurance-fortitude-intellect-health-restore-magicka-restore-stamina-restore", // Essence of Health
  [8586519]: "endurance-expedition-intellect-magicka-restore-stamina-restore", // Essence of Magicka
  [8722207]: "endurance-expedition-heroism-stamina-restore", // Essence of Stamina
  [8722203]: "endurance-expedition-health-restore-stamina-restore", // Essence of Stamina
  [8719639]: "brutality-endurance-expedition-stamina-restore", // Essence of Weapon Power
  [8719633]: "brutality-endurance-savagery-stamina-restore", // Essence of Weapon Power
  [8459805]: "fortitude-vitality-vanish-health-restore", // Essence of Health
  [8458006]: "fortitude-prophecy-vanish-health-restore", // Essence of Spell Critical
  [8454919]: "fortitude-intellect-health-restore-magicka-restore-resistance-spell", // Essence of Health
  [8587029]: "intellect-magicka-restore-resistance-spell-stealth-detection", // Essence of Magicka
  [8454927]: "fortitude-intellect-prophecy-health-restore-magicka-restore", // Essence of Spell Critical
  [8455945]: "fortitude-health-restore-resistance-physical-resistance-spell", // Essence of Health
  [8587033]: "intellect-protection-magicka-restore-resistance-spell", // Essence of Magicka
  [10165535]: "vitality-heroism-health-restore", // Essence of Vitality
  [8586517]: "endurance-intellect-magicka-restore-stamina-restore-stealth-detection", // Essence of Magicka
  [8588053]: "intellect-sorcery-magicka-restore-stealth-detection", // Essence of Spell Power
  [8720661]: "endurance-savagery-stamina-restore-stealth-detection", // Essence of Weapon Crit
  [8586527]: "endurance-intellect-heroism-magicka-restore-stamina-restore", // Essence of Magicka
  [8455441]: "endurance-fortitude-savagery-health-restore-stamina-restore", // Essence of Weapon Crit
  [8588047]: "intellect-prophecy-sorcery-magicka-restore", // Essence of Spell Power
  [8458001]: "fortitude-prophecy-savagery-health-restore", // Essence of Weapon Crit
  [9837343]: "heroism-vanish-health-restore", // Essence of Invisible
  [9836319]: "expedition-heroism-vanish", // Essence of Speed
  [9903391]: "expedition-vitality-heroism", // Essence of Speed
  [9836317]: "expedition-vitality-vanish", // Essence of Speed
  [9902879]: "expedition-heroism-health-restore", // Essence of Speed
  [8589079]: "expedition-intellect-prophecy-magicka-restore", // Essence of Spell Critical
  [8591129]: "expedition-intellect-protection-magicka-restore", // Essence of Magicka
  [9836315]: "expedition-vanish-health-restore", // Essence of Speed
}

/**
 * Parse PotionData from an ESO item link.
 * PotionData is the last colon-separated field before |h in the link.
 * Returns 0 for crown/dropped potions, non-zero for crafted potions.
 *
 * `string.match` returns `LuaMultiReturn<string[]>`; destructure at the
 * boundary so the rest of the function flows plain values (the
 * `tstl-no-multi-store` plugin disallows forwarding the multi-return).
 */
export function parsePotionData(itemLink: string): number {
  const [potionData] = string.match(itemLink, ":(%d+)|h")
  if (potionData !== undefined) {
    return tonumber(potionData) ?? 0
  }
  return 0
}

export function getPotionIndex(itemId: number, encodedTraits: number): number {
  if (encodedTraits !== 0) {
    return POTION_ENCODED_TRAITS_TO_INDEX[encodedTraits] ?? 0
  }
  return POTION_ITEM_ID_TO_INDEX[itemId] ?? 0
}

export function getPotionTemperId(itemId: number, encodedTraits: number): string {
  if (encodedTraits !== 0) {
    return POTION_ENCODED_TRAITS_TO_TEMPER_ID[encodedTraits] ?? "no-potion"
  }
  return POTION_ITEM_ID_TO_TEMPER_ID[itemId] ?? "no-potion"
}
