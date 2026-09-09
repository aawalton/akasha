import type { TemperGrimoire } from "../../temper-grimoire.page-type.ts"

export const torchbearer = {
  id: "01a05fce-2957-7c9c-94dc-fa6f30dc958a",
  pageTypeSlug: "temper-grimoire",
  slug: "torchbearer",
  title: "Torchbearer",
  key: "torchbearer",
  icon: "/esoui/art/icons/item_grimoire_fightersguild.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_fightersguild.dds",
  itemId: 204494,
  uespId: 10,
  skillLineId: "guild-fighters-guild",
  focusScripts: [
    "bleed-damage",
    "flame-damage",
    "frost-damage",
    "generate-ultimate",
    "healing",
    "knockback",
    "physical-damage",
    "stun",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
