import type { TemperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.types.ts"

export const soulBurst = {
  id: "01a05fce-2957-7ae5-95ec-65da7a32b304",
  type: "page-type/temper-grimoire",
  slug: "soul-burst",
  title: "Soul Burst",
  key: "soul-burst",
  icon: "/esoui/art/icons/item_grimoire_soulmagic2.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
  itemId: 204492,
  uespId: 8,
  skillLineId: "temper-skill-line/world-soul-magic",
  focusScripts: [
    "temper-focus-script/bleed-damage",
    "temper-focus-script/damage-shield",
    "temper-focus-script/disease-damage",
    "temper-focus-script/flame-damage",
    "temper-focus-script/frost-damage",
    "temper-focus-script/healing",
    "temper-focus-script/immobilize",
    "temper-focus-script/magic-damage",
    "temper-focus-script/physical-damage",
    "temper-focus-script/pull",
    "temper-focus-script/shock-damage",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
