import type { TemperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.types.ts"

export const travelingKnife = {
  id: "01a05fce-2958-7007-a7ea-a087ca479f02",
  type: "page-type/temper-grimoire",
  slug: "traveling-knife",
  title: "Traveling Knife",
  key: "traveling-knife",
  icon: "/esoui/art/icons/item_grimoire_dualwield.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_dualwield.dds",
  itemId: 204490,
  uespId: 7,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  focusScripts: [
    "temper-focus-script/bleed-damage",
    "temper-focus-script/frost-damage",
    "temper-focus-script/magic-damage",
    "temper-focus-script/multi-target",
    "temper-focus-script/physical-damage",
    "temper-focus-script/poison-damage",
    "temper-focus-script/pull",
    "temper-focus-script/stun",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
