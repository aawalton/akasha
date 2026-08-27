/**
 * Player Equipment Mappings (Generated)
 *
 * Maps ESO trait types, enchant categories, and weapon types to temper indices and string IDs.
 * Keys are ESO Lua global constants that resolve to numbers at runtime.
 * Source: engine/equipment/ data files
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const PLAYER_ARMOR_TRAIT_ESO_ID_TO_INDEX: Record<number, number> = {
  [ITEM_TRAIT_TYPE_NONE]: 0, // No Trait
  [ITEM_TRAIT_TYPE_ARMOR_DIVINES]: 1, // Divines
  [ITEM_TRAIT_TYPE_ARMOR_IMPENETRABLE]: 2, // Impenetrable
  [ITEM_TRAIT_TYPE_ARMOR_INFUSED]: 3, // Infused
  [ITEM_TRAIT_TYPE_ARMOR_PROLIFIC]: 4, // Invigorating
  [ITEM_TRAIT_TYPE_ARMOR_NIRNHONED]: 5, // Nirnhoned
  [ITEM_TRAIT_TYPE_ARMOR_REINFORCED]: 6, // Reinforced
  [ITEM_TRAIT_TYPE_ARMOR_STURDY]: 7, // Sturdy
  [ITEM_TRAIT_TYPE_ARMOR_TRAINING]: 8, // Training
  [ITEM_TRAIT_TYPE_ARMOR_WELL_FITTED]: 9, // Well-Fitted
  [ITEM_TRAIT_TYPE_ARMOR_ORNATE]: 10, // Ornate
  [ITEM_TRAIT_TYPE_ARMOR_INTRICATE]: 11, // Intricate
}

export const PLAYER_ARMOR_TRAIT_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [ITEM_TRAIT_TYPE_NONE]: "no-trait", // No Trait
  [ITEM_TRAIT_TYPE_ARMOR_DIVINES]: "divines", // Divines
  [ITEM_TRAIT_TYPE_ARMOR_IMPENETRABLE]: "impenetrable", // Impenetrable
  [ITEM_TRAIT_TYPE_ARMOR_INFUSED]: "infused", // Infused
  [ITEM_TRAIT_TYPE_ARMOR_PROLIFIC]: "invigorating", // Invigorating
  [ITEM_TRAIT_TYPE_ARMOR_NIRNHONED]: "nirnhoned", // Nirnhoned
  [ITEM_TRAIT_TYPE_ARMOR_REINFORCED]: "reinforced", // Reinforced
  [ITEM_TRAIT_TYPE_ARMOR_STURDY]: "sturdy", // Sturdy
  [ITEM_TRAIT_TYPE_ARMOR_TRAINING]: "training", // Training
  [ITEM_TRAIT_TYPE_ARMOR_WELL_FITTED]: "well-fitted", // Well-Fitted
  [ITEM_TRAIT_TYPE_ARMOR_ORNATE]: "ornate", // Ornate
  [ITEM_TRAIT_TYPE_ARMOR_INTRICATE]: "intricate", // Intricate
}

export function getPlayerArmorTraitIndex(esoId: number): number {
  return PLAYER_ARMOR_TRAIT_ESO_ID_TO_INDEX[esoId] ?? 0
}

export function getPlayerArmorTraitTemperId(esoId: number): string {
  return PLAYER_ARMOR_TRAIT_ESO_ID_TO_TEMPER_ID[esoId] ?? "no-trait"
}

export const PLAYER_WEAPON_TRAIT_ESO_ID_TO_INDEX: Record<number, number> = {
  [ITEM_TRAIT_TYPE_NONE]: 0, // No Trait
  [ITEM_TRAIT_TYPE_WEAPON_CHARGED]: 1, // Charged
  [ITEM_TRAIT_TYPE_WEAPON_DECISIVE]: 2, // Decisive
  [ITEM_TRAIT_TYPE_WEAPON_DEFENDING]: 3, // Defending
  [ITEM_TRAIT_TYPE_WEAPON_INFUSED]: 4, // Infused
  [ITEM_TRAIT_TYPE_WEAPON_NIRNHONED]: 5, // Nirnhoned
  [ITEM_TRAIT_TYPE_WEAPON_POWERED]: 6, // Powered
  [ITEM_TRAIT_TYPE_WEAPON_PRECISE]: 7, // Precise
  [ITEM_TRAIT_TYPE_WEAPON_SHARPENED]: 8, // Sharpened
  [ITEM_TRAIT_TYPE_WEAPON_TRAINING]: 9, // Training
  [ITEM_TRAIT_TYPE_WEAPON_ORNATE]: 10, // Ornate
  [ITEM_TRAIT_TYPE_WEAPON_INTRICATE]: 11, // Intricate
}

export const PLAYER_WEAPON_TRAIT_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [ITEM_TRAIT_TYPE_NONE]: "no-trait", // No Trait
  [ITEM_TRAIT_TYPE_WEAPON_CHARGED]: "charged", // Charged
  [ITEM_TRAIT_TYPE_WEAPON_DECISIVE]: "decisive", // Decisive
  [ITEM_TRAIT_TYPE_WEAPON_DEFENDING]: "defending", // Defending
  [ITEM_TRAIT_TYPE_WEAPON_INFUSED]: "infused", // Infused
  [ITEM_TRAIT_TYPE_WEAPON_NIRNHONED]: "nirnhoned", // Nirnhoned
  [ITEM_TRAIT_TYPE_WEAPON_POWERED]: "powered", // Powered
  [ITEM_TRAIT_TYPE_WEAPON_PRECISE]: "precise", // Precise
  [ITEM_TRAIT_TYPE_WEAPON_SHARPENED]: "sharpened", // Sharpened
  [ITEM_TRAIT_TYPE_WEAPON_TRAINING]: "training", // Training
  [ITEM_TRAIT_TYPE_WEAPON_ORNATE]: "ornate", // Ornate
  [ITEM_TRAIT_TYPE_WEAPON_INTRICATE]: "intricate", // Intricate
}

export function getPlayerWeaponTraitIndex(esoId: number): number {
  return PLAYER_WEAPON_TRAIT_ESO_ID_TO_INDEX[esoId] ?? 0
}

export function getPlayerWeaponTraitTemperId(esoId: number): string {
  return PLAYER_WEAPON_TRAIT_ESO_ID_TO_TEMPER_ID[esoId] ?? "no-trait"
}

export const PLAYER_JEWELRY_TRAIT_ESO_ID_TO_INDEX: Record<number, number> = {
  [ITEM_TRAIT_TYPE_NONE]: 0, // No Trait
  [ITEM_TRAIT_TYPE_JEWELRY_ARCANE]: 1, // Arcane
  [ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY]: 2, // Bloodthirsty
  [ITEM_TRAIT_TYPE_JEWELRY_HARMONY]: 3, // Harmony
  [ITEM_TRAIT_TYPE_JEWELRY_HEALTHY]: 4, // Healthy
  [ITEM_TRAIT_TYPE_JEWELRY_INFUSED]: 5, // Infused
  [ITEM_TRAIT_TYPE_JEWELRY_PROTECTIVE]: 6, // Protective
  [ITEM_TRAIT_TYPE_JEWELRY_ROBUST]: 7, // Robust
  [ITEM_TRAIT_TYPE_JEWELRY_SWIFT]: 8, // Swift
  [ITEM_TRAIT_TYPE_JEWELRY_TRIUNE]: 9, // Triune
  [ITEM_TRAIT_TYPE_JEWELRY_ORNATE]: 10, // Ornate
  [ITEM_TRAIT_TYPE_JEWELRY_INTRICATE]: 11, // Intricate
}

export const PLAYER_JEWELRY_TRAIT_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [ITEM_TRAIT_TYPE_NONE]: "no-trait", // No Trait
  [ITEM_TRAIT_TYPE_JEWELRY_ARCANE]: "arcane", // Arcane
  [ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY]: "bloodthirsty", // Bloodthirsty
  [ITEM_TRAIT_TYPE_JEWELRY_HARMONY]: "harmony", // Harmony
  [ITEM_TRAIT_TYPE_JEWELRY_HEALTHY]: "healthy", // Healthy
  [ITEM_TRAIT_TYPE_JEWELRY_INFUSED]: "infused", // Infused
  [ITEM_TRAIT_TYPE_JEWELRY_PROTECTIVE]: "protective", // Protective
  [ITEM_TRAIT_TYPE_JEWELRY_ROBUST]: "robust", // Robust
  [ITEM_TRAIT_TYPE_JEWELRY_SWIFT]: "swift", // Swift
  [ITEM_TRAIT_TYPE_JEWELRY_TRIUNE]: "triune", // Triune
  [ITEM_TRAIT_TYPE_JEWELRY_ORNATE]: "ornate", // Ornate
  [ITEM_TRAIT_TYPE_JEWELRY_INTRICATE]: "intricate", // Intricate
}

export function getPlayerJewelryTraitIndex(esoId: number): number {
  return PLAYER_JEWELRY_TRAIT_ESO_ID_TO_INDEX[esoId] ?? 0
}

export function getPlayerJewelryTraitTemperId(esoId: number): string {
  return PLAYER_JEWELRY_TRAIT_ESO_ID_TO_TEMPER_ID[esoId] ?? "no-trait"
}

export const PLAYER_ARMOR_ENCHANT_ESO_ID_TO_INDEX: Record<number, number> = {
  [ENCHANTMENT_SEARCH_CATEGORY_NONE]: 0, // No Enchant
  [ENCHANTMENT_SEARCH_CATEGORY_HEALTH]: 1, // Health
  [ENCHANTMENT_SEARCH_CATEGORY_MAGICKA]: 2, // Magicka
  [ENCHANTMENT_SEARCH_CATEGORY_STAMINA]: 3, // Stamina
  [ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_DEFENSE]: 4, // Prismatic Defense
}

export const PLAYER_ARMOR_ENCHANT_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [ENCHANTMENT_SEARCH_CATEGORY_NONE]: "no-enchant", // No Enchant
  [ENCHANTMENT_SEARCH_CATEGORY_HEALTH]: "health", // Health
  [ENCHANTMENT_SEARCH_CATEGORY_MAGICKA]: "magicka", // Magicka
  [ENCHANTMENT_SEARCH_CATEGORY_STAMINA]: "stamina", // Stamina
  [ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_DEFENSE]: "prismatic-defense", // Prismatic Defense
}

export function getPlayerArmorEnchantIndex(esoId: number): number {
  return PLAYER_ARMOR_ENCHANT_ESO_ID_TO_INDEX[esoId] ?? 0
}

export function getPlayerArmorEnchantTemperId(esoId: number): string {
  return PLAYER_ARMOR_ENCHANT_ESO_ID_TO_TEMPER_ID[esoId] ?? "no-enchant"
}

export const PLAYER_WEAPON_ENCHANT_ESO_ID_TO_INDEX: Record<number, number> = {
  [ENCHANTMENT_SEARCH_CATEGORY_NONE]: 0, // No Enchant
  [ENCHANTMENT_SEARCH_CATEGORY_BERSERKER]: 1, // Weapon Damage
  [ENCHANTMENT_SEARCH_CATEGORY_ABSORB_HEALTH]: 2, // Absorb Health
  [ENCHANTMENT_SEARCH_CATEGORY_ABSORB_MAGICKA]: 3, // Absorb Magicka
  [ENCHANTMENT_SEARCH_CATEGORY_ABSORB_STAMINA]: 4, // Absorb Stamina
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_ARMOR]: 5, // Crushing
  [ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_HEALTH]: 6, // Decrease Health
  [ENCHANTMENT_SEARCH_CATEGORY_FIERY_WEAPON]: 7, // Flame
  [ENCHANTMENT_SEARCH_CATEGORY_FROZEN_WEAPON]: 8, // Frost
  [ENCHANTMENT_SEARCH_CATEGORY_CHARGED_WEAPON]: 9, // Shock
  [ENCHANTMENT_SEARCH_CATEGORY_POISONED_WEAPON]: 10, // Poison
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POWER]: 11, // Weakening
  [ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_SHIELD]: 12, // Hardening
  [ENCHANTMENT_SEARCH_CATEGORY_BEFOULED_WEAPON]: 13, // Foulness
  [ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_ONSLAUGHT]: 14, // Prismatic Onslaught
}

export const PLAYER_WEAPON_ENCHANT_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [ENCHANTMENT_SEARCH_CATEGORY_NONE]: "no-enchant", // No Enchant
  [ENCHANTMENT_SEARCH_CATEGORY_BERSERKER]: "weapon-damage", // Weapon Damage
  [ENCHANTMENT_SEARCH_CATEGORY_ABSORB_HEALTH]: "absorb-health", // Absorb Health
  [ENCHANTMENT_SEARCH_CATEGORY_ABSORB_MAGICKA]: "absorb-magicka", // Absorb Magicka
  [ENCHANTMENT_SEARCH_CATEGORY_ABSORB_STAMINA]: "absorb-stamina", // Absorb Stamina
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_ARMOR]: "crushing", // Crushing
  [ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_HEALTH]: "decrease-health", // Decrease Health
  [ENCHANTMENT_SEARCH_CATEGORY_FIERY_WEAPON]: "flame", // Flame
  [ENCHANTMENT_SEARCH_CATEGORY_FROZEN_WEAPON]: "frost", // Frost
  [ENCHANTMENT_SEARCH_CATEGORY_CHARGED_WEAPON]: "shock", // Shock
  [ENCHANTMENT_SEARCH_CATEGORY_POISONED_WEAPON]: "poison", // Poison
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POWER]: "weakening", // Weakening
  [ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_SHIELD]: "hardening", // Hardening
  [ENCHANTMENT_SEARCH_CATEGORY_BEFOULED_WEAPON]: "foulness", // Foulness
  [ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_ONSLAUGHT]: "prismatic-onslaught", // Prismatic Onslaught
}

export function getPlayerWeaponEnchantIndex(esoId: number): number {
  return PLAYER_WEAPON_ENCHANT_ESO_ID_TO_INDEX[esoId] ?? 0
}

export function getPlayerWeaponEnchantTemperId(esoId: number): string {
  return PLAYER_WEAPON_ENCHANT_ESO_ID_TO_TEMPER_ID[esoId] ?? "no-enchant"
}

export const PLAYER_JEWELRY_ENCHANT_ESO_ID_TO_INDEX: Record<number, number> = {
  [ENCHANTMENT_SEARCH_CATEGORY_NONE]: 0, // No Enchant
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_PHYSICAL_DAMAGE]: 1, // Increase Physical Harm
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_SPELL_DAMAGE]: 2, // Increase Magical Harm
  [ENCHANTMENT_SEARCH_CATEGORY_MAGICKA_REGEN]: 3, // Magicka Recovery
  [ENCHANTMENT_SEARCH_CATEGORY_STAMINA_REGEN]: 4, // Stamina Recovery
  [ENCHANTMENT_SEARCH_CATEGORY_HEALTH_REGEN]: 5, // Health Recovery
  [ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_REGEN]: 6, // Prismatic Recovery
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_SPELL_COST]: 7, // Reduce Spell Cost
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_FEAT_COST]: 8, // Reduce Feat Cost
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POWER]: 9, // Reduce Skill Cost
  [ENCHANTMENT_SEARCH_CATEGORY_FIRE_RESISTANT]: 10, // Flame Resist
  [ENCHANTMENT_SEARCH_CATEGORY_FROST_RESISTANT]: 11, // Frost Resist
  [ENCHANTMENT_SEARCH_CATEGORY_SHOCK_RESISTANT]: 12, // Shock Resist
  [ENCHANTMENT_SEARCH_CATEGORY_POISON_RESISTANT]: 13, // Poison Resist
  [ENCHANTMENT_SEARCH_CATEGORY_DISEASE_RESISTANT]: 14, // Disease Resist
  [ENCHANTMENT_SEARCH_CATEGORY_DECREASE_PHYSICAL_DAMAGE]: 15, // Decrease Physical Harm
  [ENCHANTMENT_SEARCH_CATEGORY_DECREASE_SPELL_DAMAGE]: 16, // Decrease Spell Harm
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_BASH_DAMAGE]: 17, // Bashing
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_BLOCK_AND_BASH]: 18, // Bracing
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_POTION_EFFECTIVENESS]: 19, // Potion Boost
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POTION_COOLDOWN]: 20, // Potion Speed
}

export const PLAYER_JEWELRY_ENCHANT_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [ENCHANTMENT_SEARCH_CATEGORY_NONE]: "no-enchant", // No Enchant
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_PHYSICAL_DAMAGE]: "increase-physical-harm", // Increase Physical Harm
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_SPELL_DAMAGE]: "increase-magical-harm", // Increase Magical Harm
  [ENCHANTMENT_SEARCH_CATEGORY_MAGICKA_REGEN]: "magicka-recovery", // Magicka Recovery
  [ENCHANTMENT_SEARCH_CATEGORY_STAMINA_REGEN]: "stamina-recovery", // Stamina Recovery
  [ENCHANTMENT_SEARCH_CATEGORY_HEALTH_REGEN]: "health-recovery", // Health Recovery
  [ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_REGEN]: "prismatic-recovery", // Prismatic Recovery
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_SPELL_COST]: "reduce-spell-cost", // Reduce Spell Cost
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_FEAT_COST]: "reduce-feat-cost", // Reduce Feat Cost
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POWER]: "reduce-skill-cost", // Reduce Skill Cost
  [ENCHANTMENT_SEARCH_CATEGORY_FIRE_RESISTANT]: "flame-resist", // Flame Resist
  [ENCHANTMENT_SEARCH_CATEGORY_FROST_RESISTANT]: "frost-resist", // Frost Resist
  [ENCHANTMENT_SEARCH_CATEGORY_SHOCK_RESISTANT]: "shock-resist", // Shock Resist
  [ENCHANTMENT_SEARCH_CATEGORY_POISON_RESISTANT]: "poison-resist", // Poison Resist
  [ENCHANTMENT_SEARCH_CATEGORY_DISEASE_RESISTANT]: "disease-resist", // Disease Resist
  [ENCHANTMENT_SEARCH_CATEGORY_DECREASE_PHYSICAL_DAMAGE]: "decrease-physical-harm", // Decrease Physical Harm
  [ENCHANTMENT_SEARCH_CATEGORY_DECREASE_SPELL_DAMAGE]: "decrease-spell-harm", // Decrease Spell Harm
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_BASH_DAMAGE]: "bashing", // Bashing
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_BLOCK_AND_BASH]: "bracing", // Bracing
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_POTION_EFFECTIVENESS]: "potion-boost", // Potion Boost
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POTION_COOLDOWN]: "potion-speed", // Potion Speed
}

export function getPlayerJewelryEnchantIndex(esoId: number): number {
  return PLAYER_JEWELRY_ENCHANT_ESO_ID_TO_INDEX[esoId] ?? 0
}

export function getPlayerJewelryEnchantTemperId(esoId: number): string {
  return PLAYER_JEWELRY_ENCHANT_ESO_ID_TO_TEMPER_ID[esoId] ?? "no-enchant"
}

export const PLAYER_WEAPON_TYPE_ESO_ID_TO_INDEX: Record<number, number> = {
  [WEAPONTYPE_AXE]: 0, // Axe
  [WEAPONTYPE_TWO_HANDED_AXE]: 1, // Battleaxe
  [WEAPONTYPE_BOW]: 2, // Bow
  [WEAPONTYPE_DAGGER]: 3, // Dagger
  [WEAPONTYPE_TWO_HANDED_SWORD]: 4, // Greatsword
  [WEAPONTYPE_FROST_STAFF]: 5, // Ice Staff
  [WEAPONTYPE_FIRE_STAFF]: 6, // Inferno Staff
  [WEAPONTYPE_LIGHTNING_STAFF]: 7, // Lightning Staff
  [WEAPONTYPE_HAMMER]: 8, // Mace
  [WEAPONTYPE_TWO_HANDED_HAMMER]: 9, // Maul
  [WEAPONTYPE_NONE]: 10, // No Type
  [WEAPONTYPE_HEALING_STAFF]: 11, // Restoration Staff
  [WEAPONTYPE_SWORD]: 12, // Sword
}

export const PLAYER_WEAPON_TYPE_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [WEAPONTYPE_AXE]: "axe", // Axe
  [WEAPONTYPE_TWO_HANDED_AXE]: "battleaxe", // Battleaxe
  [WEAPONTYPE_BOW]: "bow", // Bow
  [WEAPONTYPE_DAGGER]: "dagger", // Dagger
  [WEAPONTYPE_TWO_HANDED_SWORD]: "greatsword", // Greatsword
  [WEAPONTYPE_FROST_STAFF]: "ice-staff", // Ice Staff
  [WEAPONTYPE_FIRE_STAFF]: "inferno-staff", // Inferno Staff
  [WEAPONTYPE_LIGHTNING_STAFF]: "lightning-staff", // Lightning Staff
  [WEAPONTYPE_HAMMER]: "mace", // Mace
  [WEAPONTYPE_TWO_HANDED_HAMMER]: "maul", // Maul
  [WEAPONTYPE_NONE]: "no-type", // No Type
  [WEAPONTYPE_HEALING_STAFF]: "restoration-staff", // Restoration Staff
  [WEAPONTYPE_SWORD]: "sword", // Sword
}

export function getPlayerWeaponTypeIndex(esoId: number): number {
  return PLAYER_WEAPON_TYPE_ESO_ID_TO_INDEX[esoId] ?? 0
}

export function getPlayerWeaponTypeTemperId(esoId: number): string {
  return PLAYER_WEAPON_TYPE_ESO_ID_TO_TEMPER_ID[esoId] ?? "no-type"
}
