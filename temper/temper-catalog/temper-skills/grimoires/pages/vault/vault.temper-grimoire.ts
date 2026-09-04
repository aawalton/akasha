import type { TemperGrimoire } from "../../temper-grimoire.page-type.ts"

export const vault = {
  id: "01a05fce-2959-739f-879f-e1dc43900386",
  pageTypeSlug: "temper-grimoire",
  slug: "vault",
  title: "Vault",
  key: "vault",
  icon: "/esoui/art/icons/item_grimoire_bow.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_bow.dds",
  itemId: 204485,
  uespId: 1,
  skillLineId: "weapon-bow",
  focusScripts: [
    "bleed-damage",
    "disease-damage",
    "flame-damage",
    "healing",
    "immobilize",
    "physical-damage",
    "poison-damage",
    "taunt",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
