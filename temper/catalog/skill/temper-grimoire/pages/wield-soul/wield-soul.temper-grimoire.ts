import type { TemperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.types.ts"

export const wieldSoul = {
  id: "01a05fce-2959-7331-ba75-a2bd0c58545a",
  type: "page-type/temper-grimoire",
  slug: "wield-soul",
  title: "Wield Soul",
  key: "wield-soul",
  icon: "/esoui/art/icons/item_grimoire_soulmagic1.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
  itemId: 204491,
  uespId: 2,
  skillLineId: "world-soul-magic",
  focusScripts: [
    "temper-focus-script/bleed-damage",
    "temper-focus-script/damage-shield",
    "temper-focus-script/disease-damage",
    "temper-focus-script/flame-damage",
    "temper-focus-script/frost-damage",
    "temper-focus-script/healing",
    "temper-focus-script/magic-damage",
    "temper-focus-script/physical-damage",
    "temper-focus-script/pull",
    "temper-focus-script/shock-damage",
    "temper-focus-script/stun",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
