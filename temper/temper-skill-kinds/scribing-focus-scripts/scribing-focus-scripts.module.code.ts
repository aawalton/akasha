import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface FocusScriptTemplate {
  id: string
  name: string
  icon: string
  slotType: "focus-slot"
  itemId: number
  uespId: number
}

const FOCUS_SCRIPT_DATA = {
  "physical-damage": {
    id: "physical-damage",
    name: "Physical Damage",
    icon: "/esoui/art/icons/scribing_primary_physical.dds",
    slotType: "focus-slot",
    itemId: 204549,
    uespId: 1,
  },
  "poison-damage": {
    id: "poison-damage",
    name: "Poison Damage",
    icon: "/esoui/art/icons/scribing_primary_poison.dds",
    slotType: "focus-slot",
    itemId: 204550,
    uespId: 2,
  },
  "disease-damage": {
    id: "disease-damage",
    name: "Disease Damage",
    icon: "/esoui/art/icons/scribing_primary_disease.dds",
    slotType: "focus-slot",
    itemId: 204551,
    uespId: 3,
  },
  "bleed-damage": {
    id: "bleed-damage",
    name: "Bleed Damage",
    icon: "/esoui/art/icons/scribing_primary_bleeding.dds",
    slotType: "focus-slot",
    itemId: 204552,
    uespId: 4,
  },
  "magic-damage": {
    id: "magic-damage",
    name: "Magic Damage",
    icon: "/esoui/art/icons/scribing_primary_magicka.dds",
    slotType: "focus-slot",
    itemId: 204553,
    uespId: 5,
  },
  "shock-damage": {
    id: "shock-damage",
    name: "Shock Damage",
    icon: "/esoui/art/icons/scribing_primary_shock.dds",
    slotType: "focus-slot",
    itemId: 204554,
    uespId: 6,
  },
  "frost-damage": {
    id: "frost-damage",
    name: "Frost Damage",
    icon: "/esoui/art/icons/scribing_primary_frost.dds",
    slotType: "focus-slot",
    itemId: 204555,
    uespId: 7,
  },
  "flame-damage": {
    id: "flame-damage",
    name: "Flame Damage",
    icon: "/esoui/art/icons/scribing_primary_flame.dds",
    slotType: "focus-slot",
    itemId: 204556,
    uespId: 8,
  },
  "trauma": {
    id: "trauma",
    name: "Trauma",
    icon: "/esoui/art/icons/scribing_primary_trauma.dds",
    slotType: "focus-slot",
    itemId: 204557,
    uespId: 9,
  },
  "multi-target": {
    id: "multi-target",
    name: "Multi-Target",
    icon: "/esoui/art/icons/scribing_primary_multihit.dds",
    slotType: "focus-slot",
    itemId: 204558,
    uespId: 10,
  },
  "taunt": {
    id: "taunt",
    name: "Taunt",
    icon: "/esoui/art/icons/scribing_primary_taunt.dds",
    slotType: "focus-slot",
    itemId: 204560,
    uespId: 12,
  },
  "knockback": {
    id: "knockback",
    name: "Knockback",
    icon: "/esoui/art/icons/scribing_primary_knockback.dds",
    slotType: "focus-slot",
    itemId: 204561,
    uespId: 13,
  },
  "pull": {
    id: "pull",
    name: "Pull",
    icon: "/esoui/art/icons/scribing_primary_pull.dds",
    slotType: "focus-slot",
    itemId: 204562,
    uespId: 14,
  },
  "immobilize": {
    id: "immobilize",
    name: "Immobilize",
    icon: "/esoui/art/icons/scribing_primary_immobilized.dds",
    slotType: "focus-slot",
    itemId: 204563,
    uespId: 15,
  },
  "stun": {
    id: "stun",
    name: "Stun",
    icon: "/esoui/art/icons/scribing_primary_stunned.dds",
    slotType: "focus-slot",
    itemId: 204564,
    uespId: 16,
  },
  "dispel": {
    id: "dispel",
    name: "Dispel",
    icon: "/esoui/art/icons/scribing_primary_dispelled.dds",
    slotType: "focus-slot",
    itemId: 204565,
    uespId: 17,
  },
  "healing": {
    id: "healing",
    name: "Healing",
    icon: "/esoui/art/icons/scribing_primary_healing.dds",
    slotType: "focus-slot",
    itemId: 204566,
    uespId: 18,
  },
  "restore-resources": {
    id: "restore-resources",
    name: "Restore Resources",
    icon: "/esoui/art/icons/scribing_primary_resourcerestore.dds",
    slotType: "focus-slot",
    itemId: 204567,
    uespId: 19,
  },
  "damage-shield": {
    id: "damage-shield",
    name: "Damage Shield",
    icon: "/esoui/art/icons/scribing_primary_damageshield.dds",
    slotType: "focus-slot",
    itemId: 204568,
    uespId: 20,
  },
  "generate-ultimate": {
    id: "generate-ultimate",
    name: "Generate Ultimate",
    icon: "/esoui/art/icons/scribing_primary_gainultimate.dds",
    slotType: "focus-slot",
    itemId: 204570,
    uespId: 22,
  },
  "mitigation": {
    id: "mitigation",
    name: "Mitigation",
    icon: "/esoui/art/icons/scribing_primary_bonusarmor.dds",
    slotType: "focus-slot",
    itemId: 204571,
    uespId: 23,
  },
} as const satisfies Record<string, FocusScriptTemplate>

export const focusScripts = createDataFile<FocusScriptTemplate>()(FOCUS_SCRIPT_DATA)

export type FocusScriptId = (typeof focusScripts.ids)[number]
