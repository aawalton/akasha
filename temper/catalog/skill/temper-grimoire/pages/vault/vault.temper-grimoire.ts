import type { TemperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.types.ts"

export const vault = {
  id: "01a05fce-2959-739f-879f-e1dc43900386",
  type: "page-type/temper-grimoire",
  slug: "vault",
  title: "Vault",
  key: "vault",
  icon: "/esoui/art/icons/item_grimoire_bow.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_bow.dds",
  itemId: 204485,
  uespId: 1,
  skillLineId: "weapon-bow",
  focusScripts: [
    "temper-focus-script/bleed-damage",
    "temper-focus-script/disease-damage",
    "temper-focus-script/flame-damage",
    "temper-focus-script/healing",
    "temper-focus-script/immobilize",
    "temper-focus-script/physical-damage",
    "temper-focus-script/poison-damage",
    "temper-focus-script/taunt",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
