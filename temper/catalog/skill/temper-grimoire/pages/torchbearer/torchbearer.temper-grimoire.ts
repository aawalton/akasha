import type { TemperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.types.ts"

export const torchbearer = {
  id: "01a05fce-2957-7c9c-94dc-fa6f30dc958a",
  type: "page-type/temper-grimoire",
  slug: "torchbearer",
  title: "Torchbearer",
  key: "torchbearer",
  icon: "/esoui/art/icons/item_grimoire_fightersguild.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_fightersguild.dds",
  itemId: 204494,
  uespId: 10,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  focusScripts: [
    "temper-focus-script/bleed-damage",
    "temper-focus-script/flame-damage",
    "temper-focus-script/frost-damage",
    "temper-focus-script/generate-ultimate",
    "temper-focus-script/healing",
    "temper-focus-script/knockback",
    "temper-focus-script/physical-damage",
    "temper-focus-script/stun",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
