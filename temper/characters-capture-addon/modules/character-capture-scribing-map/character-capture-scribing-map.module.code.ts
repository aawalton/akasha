const GRIMOIRE_NAME_TO_INDEX: Record<string, number> = {
  ["Vault"]: 0,
  ["Wield Soul"]: 1,
  ["Shield Throw"]: 2,
  ["Smash"]: 3,
  ["Elemental Explosion"]: 4,
  ["Mender's Bond"]: 5,
  ["Traveling Knife"]: 6,
  ["Soul Burst"]: 7,
  ["Ulfsild's Contingency"]: 8,
  ["Torchbearer"]: 9,
  ["Trample"]: 10,
  ["Banner Bearer"]: 11,
}
export function getGrimoireIndex(name: string): number {
  return GRIMOIRE_NAME_TO_INDEX[name] ?? 0
}
const FOCUS_SCRIPT_NAME_TO_INDEX: Record<string, number> = {
  ["Physical Damage"]: 0,
  ["Poison Damage"]: 1,
  ["Disease Damage"]: 2,
  ["Bleed Damage"]: 3,
  ["Magic Damage"]: 4,
  ["Shock Damage"]: 5,
  ["Frost Damage"]: 6,
  ["Flame Damage"]: 7,
  ["Trauma"]: 8,
  ["Multi-Target"]: 9,
  ["Taunt"]: 10,
  ["Knockback"]: 11,
  ["Pull"]: 12,
  ["Immobilize"]: 13,
  ["Stun"]: 14,
  ["Dispel"]: 15,
  ["Healing"]: 16,
  ["Restore Resources"]: 17,
  ["Damage Shield"]: 18,
  ["Generate Ultimate"]: 19,
  ["Mitigation"]: 20,
}
export function getFocusScriptIndex(name: string): number {
  return FOCUS_SCRIPT_NAME_TO_INDEX[name] ?? 0
}
const SIGNATURE_SCRIPT_NAME_TO_INDEX: Record<string, number> = {
  ["Lingering Torment"]: 1,
  ["Hunter's Snare"]: 2,
  ["Knight's Valor"]: 3,
  ["Leeching Thirst"]: 4,
  ["Immobilizing Strike"]: 5,
  ["Assassin's Misery"]: 6,
  ["Anchorite's Cruelty"]: 7,
  ["Class Mastery"]: 8,
  ["Sage's Remedy"]: 9,
  ["Warmage's Defense"]: 10,
  ["Druid's Resurgence"]: 11,
  ["Thief's Swiftness"]: 12,
  ["Crusader's Defiance"]: 13,
  ["Fencer's Parry"]: 14,
  ["Gladiator's Tenacity"]: 15,
  ["Anchorite's Potency"]: 16,
  ["Wayfarer's Mastery"]: 17,
  ["Warrior's Opportunity"]: 18,
  ["Cavalier's Charge"]: 19,
  ["Growing Impact"]: 20,
}
export function getSignatureScriptIndex(name: string): number {
  return SIGNATURE_SCRIPT_NAME_TO_INDEX[name] ?? 0
}
const AFFIX_SCRIPT_NAME_TO_INDEX: Record<string, number> = {
  ["Off Balance"]: 1,
  ["Interrupt"]: 2,
  ["Savagery and Prophecy"]: 3,
  ["Expedition"]: 4,
  ["Resolve"]: 5,
  ["Evasion"]: 6,
  ["Vitality"]: 7,
  ["Berserk"]: 8,
  ["Brutality and Sorcery"]: 9,
  ["Empower"]: 10,
  ["Protection"]: 11,
  ["Courage"]: 12,
  ["Heroism"]: 13,
  ["Intellect and Endurance"]: 14,
  ["Force"]: 15,
  ["Vulnerability"]: 16,
  ["Maim"]: 17,
  ["Cowardice"]: 18,
  ["Enervation"]: 19,
  ["Mangle"]: 20,
  ["Breach"]: 21,
  ["Lifesteal"]: 22,
  ["Defile"]: 23,
  ["Brittle"]: 24,
  ["Uncertainty"]: 25,
  ["Magickasteal"]: 26,
}
export function getAffixScriptIndex(name: string): number {
  return AFFIX_SCRIPT_NAME_TO_INDEX[name] ?? 0
}
