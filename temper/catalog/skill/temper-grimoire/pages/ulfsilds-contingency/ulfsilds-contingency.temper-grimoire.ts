import type { TemperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.types.ts"

export const ulfsildsContingency = {
  id: "01a05fce-2958-73bb-b25a-8b2b6fdb14e8",
  type: "page-type/temper-grimoire",
  slug: "ulfsilds-contingency",
  title: "Ulfsild's Contingency",
  key: "ulfsilds-contingency",
  icon: "/esoui/art/icons/item_grimoire_magesguild.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_magesguild.dds",
  itemId: 204493,
  uespId: 9,
  skillLineId: "guild-mages-guild",
  focusScripts: [
    "temper-focus-script/bleed-damage",
    "temper-focus-script/damage-shield",
    "temper-focus-script/flame-damage",
    "temper-focus-script/frost-damage",
    "temper-focus-script/healing",
    "temper-focus-script/immobilize",
    "temper-focus-script/knockback",
    "temper-focus-script/magic-damage",
    "temper-focus-script/shock-damage",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
