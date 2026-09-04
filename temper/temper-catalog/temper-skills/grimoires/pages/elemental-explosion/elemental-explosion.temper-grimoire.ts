import type { TemperGrimoire } from "../../temper-grimoire.page-type.ts"

export const elementalExplosion = {
  id: "01a05fce-2956-7d68-a22a-9f1a48952793",
  pageTypeSlug: "temper-grimoire",
  slug: "elemental-explosion",
  title: "Elemental Explosion",
  key: "elemental-explosion",
  icon: "/esoui/art/icons/item_grimoire_staffdestro.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_staffdestro.dds",
  itemId: 204488,
  uespId: 5,
  skillLineId: "weapon-destruction-staff",
  focusScripts: [
    "dispel",
    "flame-damage",
    "frost-damage",
    "knockback",
    "magic-damage",
    "physical-damage",
    "shock-damage",
    "stun",
    "trauma",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
