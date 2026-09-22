import type { TemperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.types.ts"

export const elementalExplosion = {
  id: "01a05fce-2956-7d68-a22a-9f1a48952793",
  type: "page-type/temper-grimoire",
  slug: "elemental-explosion",
  title: "Elemental Explosion",
  key: "elemental-explosion",
  icon: "/esoui/art/icons/item_grimoire_staffdestro.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_staffdestro.dds",
  itemId: 204488,
  uespId: 5,
  skillLineId: "weapon-destruction-staff",
  focusScripts: [
    "temper-focus-script/dispel",
    "temper-focus-script/flame-damage",
    "temper-focus-script/frost-damage",
    "temper-focus-script/knockback",
    "temper-focus-script/magic-damage",
    "temper-focus-script/physical-damage",
    "temper-focus-script/shock-damage",
    "temper-focus-script/stun",
    "temper-focus-script/trauma",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
