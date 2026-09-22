import type { TemperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.types.ts"

export const smash = {
  id: "01a05fce-2957-764c-b963-d9a99d848f4f",
  type: "page-type/temper-grimoire",
  slug: "smash",
  title: "Smash",
  key: "smash",
  icon: "/esoui/art/icons/item_grimoire_2hander.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  itemId: 204487,
  uespId: 4,
  skillLineId: "weapon-two-handed",
  focusScripts: [
    "temper-focus-script/bleed-damage",
    "temper-focus-script/damage-shield",
    "temper-focus-script/healing",
    "temper-focus-script/knockback",
    "temper-focus-script/magic-damage",
    "temper-focus-script/physical-damage",
    "temper-focus-script/poison-damage",
    "temper-focus-script/stun",
    "temper-focus-script/taunt",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
