/**
 * Temper Affix Scripts (Generated)
 *
 * ESO scribing affix scripts (tertiary slot — buff/debuff modifiers),
 * sourced from the universal pages table (page type: temper-affix-script).
 *
 * Each entry's `id` is the stable codec-facing identifier
 * (e.g. "off-balance") and the same string is used as the record key,
 * so `TEMPER_AFFIX_SCRIPTS["off-balance"]` is well-typed and feeds the
 * `AffixScriptId` union and the `affixScripts.data` lookup in
 * @temper/game-characters-skills/scribing.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { AffixScriptTemplate } from "../scribing/affix-scripts-data"

export const TEMPER_AFFIX_SCRIPTS = {
  "no-affix-script": { id: "no-affix-script", name: "No Affix Script", icon: "", slotType: "affix-slot", itemId: 0, uespId: 0 },
  "off-balance": { id: "off-balance", name: "Off Balance", icon: "/esoui/art/icons/scribing_tertiary_offbalance.dds", slotType: "affix-slot", itemId: 204592, uespId: 44 },
  "interrupt": { id: "interrupt", name: "Interrupt", icon: "/esoui/art/icons/scribing_tertiary_interrupt.dds", slotType: "affix-slot", itemId: 204593, uespId: 45 },
  "savagery-and-prophecy": { id: "savagery-and-prophecy", name: "Savagery and Prophecy", icon: "/esoui/art/icons/scribing_tertiary_savageprophecy.dds", slotType: "affix-slot", itemId: 204594, uespId: 46 },
  "expedition": { id: "expedition", name: "Expedition", icon: "/esoui/art/icons/scribing_tertiary_expedition.dds", slotType: "affix-slot", itemId: 204595, uespId: 47 },
  "resolve": { id: "resolve", name: "Resolve", icon: "/esoui/art/icons/scribing_tertiary_resolve.dds", slotType: "affix-slot", itemId: 204596, uespId: 48 },
  "evasion": { id: "evasion", name: "Evasion", icon: "/esoui/art/icons/scribing_tertiary_evasion.dds", slotType: "affix-slot", itemId: 204597, uespId: 49 },
  "vitality": { id: "vitality", name: "Vitality", icon: "/esoui/art/icons/scribing_tertiary_vitality.dds", slotType: "affix-slot", itemId: 204598, uespId: 50 },
  "berserk": { id: "berserk", name: "Berserk", icon: "/esoui/art/icons/scribing_tertiary_berserk.dds", slotType: "affix-slot", itemId: 204599, uespId: 51 },
  "brutality-and-sorcery": { id: "brutality-and-sorcery", name: "Brutality and Sorcery", icon: "/esoui/art/icons/scribing_tertiary_brutalitysorcery.dds", slotType: "affix-slot", itemId: 204600, uespId: 52 },
  "empower": { id: "empower", name: "Empower", icon: "/esoui/art/icons/scribing_tertiary_empower.dds", slotType: "affix-slot", itemId: 204601, uespId: 53 },
  "protection": { id: "protection", name: "Protection", icon: "/esoui/art/icons/scribing_tertiary_protection.dds", slotType: "affix-slot", itemId: 204602, uespId: 54 },
  "courage": { id: "courage", name: "Courage", icon: "/esoui/art/icons/scribing_tertiary_courage.dds", slotType: "affix-slot", itemId: 204603, uespId: 55 },
  "heroism": { id: "heroism", name: "Heroism", icon: "/esoui/art/icons/scribing_tertiary_heroism.dds", slotType: "affix-slot", itemId: 204604, uespId: 56 },
  "intellect-and-endurance": { id: "intellect-and-endurance", name: "Intellect and Endurance", icon: "/esoui/art/icons/scribing_tertiary_intellectendurance.dds", slotType: "affix-slot", itemId: 204605, uespId: 57 },
  "force": { id: "force", name: "Force", icon: "/esoui/art/icons/scribing_tertiary_force.dds", slotType: "affix-slot", itemId: 204606, uespId: 58 },
  "vulnerability": { id: "vulnerability", name: "Vulnerability", icon: "/esoui/art/icons/scribing_tertiary_vulnerability.dds", slotType: "affix-slot", itemId: 204607, uespId: 59 },
  "maim": { id: "maim", name: "Maim", icon: "/esoui/art/icons/scribing_tertiary_maim.dds", slotType: "affix-slot", itemId: 204608, uespId: 60 },
  "cowardice": { id: "cowardice", name: "Cowardice", icon: "/esoui/art/icons/scribing_tertiary_cowardice.dds", slotType: "affix-slot", itemId: 204609, uespId: 61 },
  "enervation": { id: "enervation", name: "Enervation", icon: "/esoui/art/icons/scribing_tertiary_enervation.dds", slotType: "affix-slot", itemId: 204610, uespId: 62 },
  "mangle": { id: "mangle", name: "Mangle", icon: "/esoui/art/icons/scribing_tertiary_mangle.dds", slotType: "affix-slot", itemId: 204611, uespId: 63 },
  "breach": { id: "breach", name: "Breach", icon: "/esoui/art/icons/scribing_tertiary_breach.dds", slotType: "affix-slot", itemId: 204612, uespId: 64 },
  "lifesteal": { id: "lifesteal", name: "Lifesteal", icon: "/esoui/art/icons/scribing_tertiary_lifesteal.dds", slotType: "affix-slot", itemId: 204613, uespId: 65 },
  "defile": { id: "defile", name: "Defile", icon: "/esoui/art/icons/scribing_tertiary_defile.dds", slotType: "affix-slot", itemId: 204614, uespId: 66 },
  "brittle": { id: "brittle", name: "Brittle", icon: "/esoui/art/icons/scribing_tertiary_brittle.dds", slotType: "affix-slot", itemId: 204615, uespId: 67 },
  "uncertainty": { id: "uncertainty", name: "Uncertainty", icon: "/esoui/art/icons/scribing_tertiary_uncertainty.dds", slotType: "affix-slot", itemId: 204616, uespId: 68 },
  "magickasteal": { id: "magickasteal", name: "Magickasteal", icon: "/esoui/art/icons/scribing_tertiary_magickasteal.dds", slotType: "affix-slot", itemId: 204617, uespId: 69 },
} as const satisfies Record<string, AffixScriptTemplate>
