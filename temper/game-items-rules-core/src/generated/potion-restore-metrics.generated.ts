/**
 * Potion Restore-Metrics (Generated)
 *
 * Lookup maps for the `potionEffects` rule condition. Crown/dropped potions
 * match by `itemId`; crafted potions match by `encodedTraits` (the packed
 * alchemy effect ids from the item link's PotionData field). Each value is the
 * deduplicated set of restoration metric ids the potion grants
 * (`health-restore` / `magicka-restore` / `stamina-restore`).
 *
 * The crafted (encodedTraits) map is derived purely from the static
 * @temper/game-items-alchemy `potions.data` catalog. The crown/dropped (itemId) map is a
 * UNION of catalog-derived entries plus GAME-SOURCED entries parsed from mined
 * potion `abilityDescription` text (`temper-mined-item` rows): catalog
 * entries are kept byte-identical and mined potions not already in the catalog
 * are appended (sorted ascending by itemId). The static catalog is the same
 * source the addon's `potion-mappings.generated.ts` descends from — so the web
 * matcher and the in-game addon classify a potion identically (parity).
 *
 * Pure data (no functions, no bitwise/regex) so it bundles cleanly into the
 * TSTL Lua addon as well as the web build.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

/** Crown/dropped potion itemId → restore metric ids. */
export const POTION_ITEM_ID_TO_RESTORE_METRICS: Record<number, readonly string[]> = {
  [64710]: ["health-restore", "magicka-restore", "stamina-restore"], // Crown Tri-Restoration Potion
  [112427]: ["magicka-restore"], // Gold Coast Spellcaster Elixir
  [112428]: ["stamina-restore"], // Gold Coast Warrior Elixir
  [124674]: ["health-restore"], // Gold Coast Swift Survivor Elixir
  [27036]: ["health-restore"], // Essence of Health
  [27037]: ["magicka-restore"], // Essence of Magicka
  [27038]: ["stamina-restore"], // Essence of Stamina
  [176041]: ["health-restore", "magicka-restore"], // Essence of Potent Health
  [176040]: ["magicka-restore"], // Essence of Potent Magicka
  [176042]: ["stamina-restore"], // Essence of Potent Stamina
  [34125]: ["health-restore"], // Health Elixir
  [42406]: ["health-restore"], // Torchbug Treacle
  [54857]: ["stamina-restore"], // Strength
  [54858]: ["magicka-restore"], // Spell Weaving
  [54859]: ["health-restore", "magicka-restore", "stamina-restore"], // Rejuvenation
  [61028]: ["health-restore"], // Crown Health Potion
  [61029]: ["stamina-restore"], // Crown Stamina Potion
  [61030]: ["magicka-restore"], // Crown Magicka Potion
  [64510]: ["health-restore"], // Crown Health Potion
  [64741]: ["health-restore", "magicka-restore", "stamina-restore"], // White Tincture
  [68350]: ["magicka-restore"], // Cyan Tincture
  [68351]: ["magicka-restore"], // Glowing Cyan Tincture
  [68352]: ["stamina-restore"], // Glowing Green Tincture
  [68353]: ["stamina-restore"], // Green Tincture
  [68356]: ["health-restore"], // Heavy Red Tincture
  [71071]: ["health-restore"], // Alliance Health Draught
  [71072]: ["magicka-restore"], // Alliance Spell Draught
  [71073]: ["stamina-restore"], // Alliance Battle Draught
  [74728]: ["stamina-restore"], // Roguish Stealth Draught
  [74729]: ["stamina-restore"], // Roguish Escape Draught
  [112430]: ["health-restore"], // Gold Coast Survivor Elixir
  [135111]: ["health-restore"], // Bound Gold Coast Swift Survivor Elixir
  [135114]: ["health-restore", "magicka-restore", "stamina-restore"], // Bound Crown Tri-Restoration Potion
  [135125]: ["magicka-restore"], // Bound Gold Coast Spellcaster Elixir
  [135127]: ["stamina-restore"], // Bound Gold Coast Warrior Elixir
  [214314]: ["health-restore", "magicka-restore", "stamina-restore"], // Tri-Restoration Potion of Vengeance
  [217946]: ["health-restore", "magicka-restore", "stamina-restore"], // Bound Tri-Restoration Potion
  [224832]: ["magicka-restore", "stamina-restore"], // Gold Coast Heroism Elixir
}

/** Crafted potion encodedTraits → restore metric ids. */
export const POTION_ENCODED_TRAITS_TO_RESTORE_METRICS: Record<number, readonly string[]> = {
  [8849689]: [], // Essence of Physical Resistance
  [8456477]: ["health-restore"], // Essence of Health
  [8984861]: [], // Essence of Vitality
  [9772288]: [], // Essence of Detection
  [8455433]: ["health-restore", "stamina-restore"], // Essence of Health
  [9902363]: ["health-restore"], // Essence of Speed
  [8454917]: ["stamina-restore", "health-restore", "magicka-restore"], // Essence of Health
  [8586519]: ["stamina-restore", "magicka-restore"], // Essence of Magicka
  [8722207]: ["stamina-restore"], // Essence of Stamina
  [8722203]: ["stamina-restore", "health-restore"], // Essence of Stamina
  [8719639]: ["stamina-restore"], // Essence of Weapon Power
  [8719633]: ["stamina-restore"], // Essence of Weapon Power
  [8459805]: ["health-restore"], // Essence of Health
  [8458006]: ["health-restore"], // Essence of Spell Critical
  [8454919]: ["health-restore", "magicka-restore"], // Essence of Health
  [8587029]: ["magicka-restore"], // Essence of Magicka
  [8454927]: ["health-restore", "magicka-restore"], // Essence of Spell Critical
  [8455945]: ["health-restore"], // Essence of Health
  [8587033]: ["magicka-restore"], // Essence of Magicka
  [10165535]: ["health-restore"], // Essence of Vitality
  [8586517]: ["stamina-restore", "magicka-restore"], // Essence of Magicka
  [8588053]: ["magicka-restore"], // Essence of Spell Power
  [8720661]: ["stamina-restore"], // Essence of Weapon Crit
  [8586527]: ["stamina-restore", "magicka-restore"], // Essence of Magicka
  [8455441]: ["stamina-restore", "health-restore"], // Essence of Weapon Crit
  [8588047]: ["magicka-restore"], // Essence of Spell Power
  [8458001]: ["health-restore"], // Essence of Weapon Crit
  [9837343]: ["health-restore"], // Essence of Invisible
  [9836319]: [], // Essence of Speed
  [9903391]: [], // Essence of Speed
  [9836317]: [], // Essence of Speed
  [9902879]: ["health-restore"], // Essence of Speed
  [8589079]: ["magicka-restore"], // Essence of Spell Critical
  [8591129]: ["magicka-restore"], // Essence of Magicka
  [9836315]: ["health-restore"], // Essence of Speed
}
