import type { TemperGrimoire } from "../../temper-grimoire.page-type.ts"

export const travelingKnife = {
  id: "01a05fce-2958-7007-a7ea-a087ca479f02",
  pageTypeSlug: "temper-grimoire",
  slug: "traveling-knife",
  title: "Traveling Knife",
  key: "traveling-knife",
  icon: "/esoui/art/icons/item_grimoire_dualwield.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_dualwield.dds",
  itemId: 204490,
  uespId: 7,
  skillLineId: "weapon-dual-wield",
  focusScripts: [
    "bleed-damage",
    "frost-damage",
    "magic-damage",
    "multi-target",
    "physical-damage",
    "poison-damage",
    "pull",
    "stun",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
