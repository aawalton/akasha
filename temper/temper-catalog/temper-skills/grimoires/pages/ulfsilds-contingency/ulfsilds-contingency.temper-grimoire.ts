import type { TemperGrimoire } from "../../temper-grimoire.page-type.ts"

export const ulfsildsContingency = {
  id: "01a05fce-2958-73bb-b25a-8b2b6fdb14e8",
  pageTypeSlug: "temper-grimoire",
  slug: "ulfsilds-contingency",
  title: "Ulfsild's Contingency",
  key: "ulfsilds-contingency",
  icon: "/esoui/art/icons/item_grimoire_magesguild.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_magesguild.dds",
  itemId: 204493,
  uespId: 9,
  skillLineId: "guild-mages-guild",
  focusScripts: [
    "bleed-damage",
    "damage-shield",
    "flame-damage",
    "frost-damage",
    "healing",
    "immobilize",
    "knockback",
    "magic-damage",
    "shock-damage",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
